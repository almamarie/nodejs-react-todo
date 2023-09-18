require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { IndexRouter } = require("./src/routes/index.router");

((async) => {
  const app = express();
  const PORT = process.env.PORT || 8080;
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, body"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    next();
  });

  app.use("/api/v0", IndexRouter);

  app.listen(PORT, () => {
    console.log(`server running at port: ${PORT}`);
    console.log("Press CTRL + C to stop server");
  });
})();
