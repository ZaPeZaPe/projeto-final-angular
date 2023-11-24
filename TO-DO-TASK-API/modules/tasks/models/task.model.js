const Sequelize = require("sequelize");
const database = require("../../../infra/db");
const User = require("../../auth/models/user.model");

const Task = database.define("Task", {
  id: {
    type: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  done: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  deadline: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

User.hasMany(Task, {
  foreignKey: "userId",
});

Task.sync();

module.exports = Task;
