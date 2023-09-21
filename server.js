require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { IndexRouter } = require("./src/routes/index.router");
const sequelize = require("./src/databases/sequelize");
const User = require("./src/models/user");
const Todo = require("./src/models/todo");
const logger = require("./src/utils/logger");

// const V0MODELS = require("./src/models/modules.index");

(async () => {
  const app = express();
  const PORT = process.env.PORT || 8080;
  app.use(bodyParser.json());
  // sequelize.addModels(V0MODELS);

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

  User.hasMany(Todo);

  sequelize
    .sync()
    // .sync({ force: true })
    .then((result) => {
      // User.create({
      //   firstName: "Louis Marie",
      //   lastName: "Atoluko Ayariga",
      //   email: "alouismariea97@gmail.com",
      //   passwordHash: "bsksjbv dsjkvbdscbdsdccdjskvcbsdvkucdsc",
      // });
    })
    .then((result) => {
      // console.log(`SQL connect result: ${result}`);
      app.listen(PORT, () => {
        logger.info(`server running at port: ${PORT}`);
        logger.info("Press CTRL + C to stop server");
      });
    });
})();
