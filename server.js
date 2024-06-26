require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
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
  app.use(helmet());
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
    .then(() => {
      app.listen(PORT, () => {
        logger.info(`server running at port: ${PORT}`);
        logger.info("Press CTRL + C to stop server");
      });
    });
})();
