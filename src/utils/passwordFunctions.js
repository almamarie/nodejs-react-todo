const bcrypt = require("bcrypt");
const config = require("../config/config");

const c = config.dev;
exports.generateHashPassword = async (password) => {
  console.log("here");

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  console.log("Password hash: ", hash);
  return hash;
};
