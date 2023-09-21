const bcrypt = require("bcrypt");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const logger = require("./logger");

exports.generateHashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

exports.comparePasswords = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

exports.generateJwt = async (user) => {
  return jwt.sign(user.format(), config.jwt.secret);
};

exports.requireAuth = async (req, res, next) => {
  logger.info("Require auth called");
  try {
    if (!req.headers || !req.headers.authorization)
      return res.status(401).send({ message: "No authorization headers." });

    const tokenBearer = req.headers.authorization.split(" ");
    if (tokenBearer.length !== 2)
      return res.status(401).send({ message: "Malformed token." });

    const token = tokenBearer[0];
    return jwt.verify(token, config.jwt.secret, (decode, err) => {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate." });
      }

      logger.info("User verified...");

      return next();
    });
  } catch (error) {
    logger.error("Unauthorised user!");
    return res.status(401).send("Unauthorised user");
  }
};
