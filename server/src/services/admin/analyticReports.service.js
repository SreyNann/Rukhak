import { BetaAnalyticsDataClient } from "@google-analytics/data";
import AggregatedOrder from "@/models/aggregatedOrder.model.js";
import dotenv from "dotenv";
import Order from "@/models/order.model.js";
import User from "@/models/user.model.js";
import Product from "@/models/product.model.js";
dotenv.config();

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\n/gm, "\n"),
  },
});
const propertyId = process.env.GA_PROPERTY_ID;

async function getActiveUsers() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: `30daysAgo`, //👈  e.g. "7daysAgo" or "30daysAgo"
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "date",
      },
    ],
    metrics: [
      {
        name: "activeUsers",
      },
    ],
  });

  function compareDates(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  }

  const results = [];
  response.rows.forEach((row) => {
    results.push({
      date: convertDateFormat(row.dimensionValues[0].value),
      count: parseInt(row.metricValues[0].value),
    });
  });

  function convertDateFormat(dateString) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}-${month}-${day}`;
  }

  function fillMissingDates(data) {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const allDates = [];
    let currentDate = new Date(thirtyDaysAgo);

    while (currentDate <= today) {
      const formattedDate = currentDate.toISOString().slice(0, 10);
      allDates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Create a new array with missing dates filled in with a count of 0
    const newData = allDates.map((date) => {
      const existingEntry = data.find((entry) => entry.date === date);
      return existingEntry ? existingEntry : { date, count: 0 };
    });

    return newData;
  }

  const sortedResults = results.sort(compareDates);
  const processedResult = fillMissingDates(sortedResults);

  return processedResult;
}

async function getAggregatedOrders(previousNthDay) {
  let dateNthDaysAgo = new Date();
  dateNthDaysAgo.setDate(dateNthDaysAgo.getDate() - previousNthDay);

  // convert to a format that can be compared with _id date format
  const year = dateNthDaysAgo.getFullYear();
  const month = dateNthDaysAgo.getMonth() + 1;
  const day = dateNthDaysAgo.getDate();

  const aggregatedOrders = await AggregatedOrder.find({
    $or: [
      {
        "_id.year": year,
        "_id.month": { $gte: month },
        "_id.day": { $gte: day },
      },
      {
        "_id.year": { $gt: year },
      },
    ],
  });

  return aggregatedOrders;
}

const analyticReportsService = {
  async getAnalyticData() {
    const activeUsers = await getActiveUsers();
    const aggregatedOrders = await getAggregatedOrders(7);
    const totalRevenue = await Order.getTotalRevenue();
    const totalAccounts = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const aggregatedData = { totalAccounts, totalProducts, totalRevenue };

    const result = { activeUsers, aggregatedOrders, aggregatedData };
    return result;
  },
};

export default analyticReportsService;
