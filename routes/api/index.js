const router = require("express").Router();
const userRoute = require("./users");
const groupRoute = require("./groups");
// const adminRoute = require("./admin");

//routes
router.use("/users", userRoute);
router.use("/groups", groupRoute);
// router.use("/service", adminRoute);
// router.use("/schedule", adminRoute);

module.exports = router;
