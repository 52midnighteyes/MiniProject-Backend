import { CLIENT_KEY, SERVER_KEY } from "../config";

import * as midtransClient from "midtrans-client";

// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: false, // Set to true for production environment
  serverKey: "YOUR_SERVER_KEY",
  clientKey: "YOUR_CLIENT_KEY",
});

// Example: Create a transaction
let parameter = {
  transaction_details: {
    order_id: "YOUR_ORDER_ID",
    gross_amount: 10000,
  },
  credit_card: {
    secure: true,
  },
};

snap
  .createTransaction(parameter)
  .then((transaction) => {
    console.log("Transaction created:", transaction);
  })
  .catch((error) => {
    console.error("Error creating transaction:", error);
  });
