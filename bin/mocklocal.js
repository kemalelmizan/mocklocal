#!/usr/bin/env node
"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.env.PORT = process.env.PORT || 3000;
process.env.MIN_DELAY = process.env.MIN_DELAY || 0;
process.env.MAX_DELAY = process.env.MAX_DELAY || 3;
process.env.RESPONSE = process.env.RESPONSE || "req";

let stdin = '';

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function () {
  let chunk = process.stdin.read();
  if (chunk !== null) {
    stdin += chunk;
  }
});

process.stdin.on('end', function () {
  if (stdin !== '') process.env.RESPONSE = stdin;
});

const isValidJSON = JSONstr => {
  try {
    JSON.parse(JSONstr);
  } catch (e) {
    return false;
  }
  return true;
};

app.all("*", (req, res) => {
  if (process.env.RESPONSE === "req")
    process.env.RESPONSE = JSON.stringify(req.body);

  // Delay in seconds
  const delay = parseFloat(
    Math.random() *
    (parseFloat(process.env.MAX_DELAY) - parseFloat(process.env.MIN_DELAY)) +
    parseFloat(process.env.MIN_DELAY)
  ).toFixed(3);

  console.log(
    `Incoming req, delayed for ${delay}s: ${req.method} - ${req.url} from ${
    req.ip
    } - ${JSON.stringify(req.body)}`
  );

  setTimeout(() => {
    console.log(
      `Responding ${req.method} - ${req.url} from ${req.ip} - ${JSON.stringify(
        req.body
      )}`
    );

    // If process.env.RESPONSE is valid json, add json header in response
    if (isValidJSON(process.env.RESPONSE))
      res.header("Content-Type", "application/json");

    res.send(process.env.RESPONSE);
  }, delay * 1000);
});

const port = process.env.PORT;
module.exports = app.listen(port, () => {
  console.log(`mocklocal started
env: 
  PORT=${process.env.PORT}
  MIN_DELAY=${process.env.MIN_DELAY}
  MAX_DELAY=${process.env.MAX_DELAY}
  RESPONSE=${process.env.RESPONSE}
`);
});
