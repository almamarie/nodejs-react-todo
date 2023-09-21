const User = require("../models/user");
const logger = require("../utils/logger");
const passwordFunctions = require("../utils/passwordFunctions");

exports.postCreateUser = async (req, res, next) => {
  logger.info("Create new user called...");

  try {
    if (req.body.password.length < 8)
      throw new Error("provided password is not strong");

    const passwordHash = await passwordFunctions.generateHashPassword(
      req.body.password
    );

    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordHash,
    };

    const response = await User.create(userData);

    return res.status(201).send({
      userId: response.userId,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      createdAt: response.createdAt,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error creating user.");
  }
};
