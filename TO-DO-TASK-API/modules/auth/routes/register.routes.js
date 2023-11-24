const { Router } = require("express");
const registerController = require("../controllers/register.controller");

const registerRouter = Router();

registerRouter.post("/", registerController.create);

module.exports = registerRouter;
