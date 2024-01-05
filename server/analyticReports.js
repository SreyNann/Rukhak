import { BetaAnalyticsDataClient } from "@google-analytics/data";
import dotenv from "dotenv";
dotenv.config();

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\n/gm, "\n"),
  },
});

async function getActiveUsers() {
  const propertyId = process.env.GA_PROPERTY_ID;
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

  console.log(processedResult);
  return processedResult;
}

getActiveUsers();
