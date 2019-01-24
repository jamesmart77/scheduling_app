const router = require("express").Router();
const userRoute = require("./user");
// const adminRoute = require("./admin");

//routes
router.use("/user", userRoute);
// router.use("/group", adminRoute);
// router.use("/service", adminRoute);
// router.use("/schedule", adminRoute);

// API calls

router.get('/hello', (req, res) => {
    res.send({ express: 'I LOVE YOU ERIN SUE MARTINEAU!!!!!' });
  });

module.exports = router;
