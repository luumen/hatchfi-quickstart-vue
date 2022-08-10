const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3003;

// For your application, we recommend setting up environment variables
// but for our quickstart, we'll just place them here. These are test
// keys and are safe for public view. Keep your keys secret!
// Make sure you replace the below keys with the keys from your Hatchfi app project in the dashboard
// const HATCHFI_CLIENT_ID = "<ADD CLIENTID HERE>";
// const HATCHFI_API_KEY = "<ADD API KEY HERE";
// const HATCHFI_SECRET_KEY = "<ADD SECRET KEY HERE>";

// const YOUR_SERVER_BASE_URL = "<YOUR SERVER BASE URL>";

const HATCHFI_CLIENT_ID = "b5b8b63e5c9542ae3240887a9bf5b3b8167db42c61051dd96a571bf5634d5162";
const HATCHFI_API_KEY = "0041a7fecc2e47838bb32708b233e622";
const HATCHFI_SECRET_KEY = "f9dc6d8458ceff284ef79f838f0232757a3ed8b4060eb2c2";
const YOUR_SERVER_BASE_URL = "http://localhost:3003";

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

  console.log("GETTING USER");
  console.log(req.body);

  // if (!req.body.userId) res.status(401).send({ error: "Please pass a valid userId." });

  const options = {
    method: "POST",
    // url: "https://api.hatchfi.co/v1/auth/login",
    url: "http://localhost:3001/v1/auth/login",
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

app.post("/account/all", async (req, res) => {
  let account;
  let transactions;
  var accountOptions = {
    method: "GET",
    // url: `https://api.hatchfi.co/v1/accounts/${req.body.accountId}`,
    url: `http://localhost:3001/v1/accounts/${req.body.accountId}`,
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
    // url: `https://api.hatchfi.co/v1/accounts/${req.body.accountId}/transactions`,
    url: `http://localhost:3001/v1/accounts/${req.body.accountId}/transactions`,
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

  res.send({ account: account, transactions: transactions });
});

app.listen(port, () => {
  console.log(`Hatchfi Quickstart - listening on port ${port}`);
});
