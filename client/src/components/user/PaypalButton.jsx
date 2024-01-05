import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const storeItems = [
  { id: 1, price: 10, name: "Learn React Today", quantity: 2 },
  { id: 2, price: 20, name: "Learn Node Today", quantity: 3 },
];

function PayPalButton() {
  const paypalOptions = {
    currency: "USD",
  };

  // Calculate the total amount of products
  const total = storeItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // Take out the important information to display in the purchase summary
  const items = storeItems.map((item) => {
    return {
      name: item.name,
      unit_amount: {
        currency_code: "USD",
        value: item.price,
      },
      quantity: item.quantity,
    };
  });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total,
              },
            },
          },
          items: items,
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // Handle the payment success, e.g., show a success message
      console.log("Payment completed:", details);
    });
  };

  const onError = (err) => {
    // Handle errors, e.g., show an error message to the user
    console.error("PayPal error:", err);
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;
