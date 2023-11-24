const database = require("../../../infra/db");
const { v4: uuidv4 } = require("uuid");
const Task = require("../models/task.model");

class TasksRepository {
  async findAll(userId) {
    await database.sync();
    return await Task.findAll({ where: { userId } });
  }

  async findOne(id, userId) {
    await database.sync();
    const task = await Task.findOne({
      where: {
        id,
        userId,
      },
    });
    return task;
  }

  async create(task, userId) {
    await database.sync();
    const createdTask = await Task.create({ ...task, userId, id: uuidv4() });
    return createdTask;
  }

  async update(id, task, userId) {
    await database.sync();
    await Task.update(task, {
      where: {
        id,
        userId,
      },
    });
    const updatedTask = await this.findOne(id, userId);
    return updatedTask;
  }

  async delete(id, userId) {
    await database.sync();

    await Task.destroy({
      where: {
        id,
        userId,
      },
    });
  }
}

module.exports = new TasksRepository();
