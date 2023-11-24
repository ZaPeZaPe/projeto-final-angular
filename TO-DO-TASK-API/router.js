const { Router } = require("express");
const authRouter = require("./modules/auth/routes/auth.routes");
const registerRouter = require("./modules/auth/routes/register.routes");
const tasksRouter = require("./modules/tasks/routes/tasks.routes");

const router = Router();

router.use("/auth", authRouter);
router.use("/register", registerRouter);
router.use("/tasks", tasksRouter);

module.exports = router;
