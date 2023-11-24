const { Router } = require("express");
const verifyToken = require("../../../middlewares/verify-token");
const tasksController = require("../controllers/tasks.controller");

const tasksRouter = Router();

tasksRouter.get("/", verifyToken, tasksController.findAll);
tasksRouter.get("/:id", verifyToken, tasksController.findById);
tasksRouter.post("/", verifyToken, tasksController.create);
tasksRouter.put("/:id", verifyToken, tasksController.update);
tasksRouter.delete("/:id", verifyToken, tasksController.delete);

module.exports = tasksRouter;
