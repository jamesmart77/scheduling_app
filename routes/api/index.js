const router = require("express").Router();
const userRoute = require("./users");
// const adminRoute = require("./admin");

//routes
router.use("/users", userRoute);
// router.use("/group", adminRoute);
// router.use("/service", adminRoute);
// router.use("/schedule", adminRoute);

module.exports = router;
