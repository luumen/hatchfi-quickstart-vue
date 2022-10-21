const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3003;
require("dotenv").config();

// For your application, we recommend setting up environment variables
// Keep your keys a secret!
const HATCHFI_CLIENT_ID = process.env.HATCHFI_CLIENT_ID;
const HATCHFI_API_KEY = process.env.HATCHFI_API_KEY;
const HATCHFI_SECRET_KEY = process.env.HATCHFI_SECRET_KEY;

// We want to set up cors as your frontend URL will likely differ from your server url
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendStatus(200); // This is just a health check, it let's us know that our server is listening.
});

// First things first, we want to be able to authenticate our user. So we'll want to log them in.
// Hatchfi's login method will create a user if no user is found with the supplied userId.
app.post("/auth-user", async (req, res) => {
  // We'll want to verify that we've received a userId from the frontend.

  console.log("Authorizing User...");
  console.log(req.body);

  // If there is no userId, lets let the user know
  if (!req.body.userId) return res.status(401).send({ error: "Please pass a valid userId." });

  const options = {
    method: "POST",
    // url: "https://api.hatchfi.co/v1/auth/login",
    url: "https://devapi.hatchfi.co/v1/auth/login",
    headers: {
      "X-Hatchfi-Api": HATCHFI_API_KEY,
      "X-Hatchfi-Secret": HATCHFI_SECRET_KEY,
      "X-Hatchfi-User-Id": req.body.userId, // We'll want to pass a field called "userId" from the frontend.
      "Content-Type": "application/json",
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.send(error.message);
    });
});

// This call will allow us to access the connected accounts balances and transactions
app.post("/account/all", async (req, res) => {
  let account;
  let transactions;
  var accountOptions = {
    method: "GET",
    url: `https://devapi.hatchfi.co/v1/accounts/${req.body.accountId}`, // This endpoint is responsible for grabbing the specified accounts balance data
    headers: {
      "X-Hatchfi-Api": HATCHFI_API_KEY,
      "X-Hatchfi-Secret": HATCHFI_SECRET_KEY,
      "X-Hatchfi-User-Id": req.body.userId, // We'll want to pass a field called "userId" from the frontend.
    },
  };

  await axios
    .request(accountOptions)
    .then(function (response) {
      console.log(response.data);
      account = response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  var transactionsOptions = {
    method: "GET",
    url: `https://devapi.hatchfi.co/v1/accounts/${req.body.accountId}/transactions`, // This endpoint is responsible for grabbing all of the specified accounts transactions
    headers: {
      "X-Hatchfi-Api": HATCHFI_API_KEY,
      "X-Hatchfi-Secret": HATCHFI_SECRET_KEY,
      "X-Hatchfi-User-Id": req.body.userId, // We'll want to pass a field called "userId" from the frontend.
    },
  };

  await axios
    .request(transactionsOptions)
    .then(function (response) {
      console.log(response.data);
      transactions = response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  res.send({ account: account, transactions: transactions }); // We send these back to our frontend to display them to the user.
});

app.listen(port, () => {
  console.log(`Hatchfi Quickstart - listening on port ${port}`);
});
