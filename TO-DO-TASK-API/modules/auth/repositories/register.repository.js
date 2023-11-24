const database = require("../../../infra/db");
const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");

class RegisterRepository {
  async create(user) {
    await database.sync();
    return await User.create({ ...user, id: uuidv4() });
  }
}

module.exports = new RegisterRepository();
