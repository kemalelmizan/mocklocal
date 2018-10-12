
process.env.PORT =  process.env.PORT || 3000;
process.env.MIN_DELAY = process.env.MIN_DELAY || 0;
process.env.MAX_DELAY = process.env.MAX_DELAY || 10;

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/:route", async (req, res) => {
  // Delay in seconds
  const delay =
    Math.floor(Math.random() * parseInt(process.env.MAX_DELAY)) +
    parseInt(process.env.MIN_DELAY);
  console.log(
    `Incoming request: ${req.method} - /${req.params.route} from ${
      req.ip
    } - ${JSON.stringify(req.body)} - will be delayed for ${delay}s`
  );

  await setTimeout(async () => {
    await console.log(
      `${req.method} - /${req.params.route} from ${req.ip} - ${JSON.stringify(
        req.body
      )} responded.`
    );
    await res.send("OK");
  }, delay * 1000);
});

const port = process.env.PORT;
module.exports = app.listen(port, () => {
  console.log(`mocklocal started
env: 
  PORT=${process.env.PORT}
  MIN_DELAY=${process.env.MIN_DELAY}
  MAX_DELAY=${process.env.MAX_DELAY}
`);
});
