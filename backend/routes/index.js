const express = require('express');
const { userRouter } = require("./user")
const { accountRouter } = require("./accounts");
const { authMiddleware } = require('../middleware');

const router = express.Router();


router.use("/user", userRouter)
router.use('/account', accountRouter)

router.get('/', function (req, res) {
    console.log("Router Working");
    res.status(200).send("Hello");
})


module.exports = {
    router,
}