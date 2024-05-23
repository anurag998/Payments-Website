const { Account } = require('../db')
const { authMiddleware} = require('../middleware')
const express = require('express')
const mongoose = require('mongoose')
const accountRouter = express.Router()


accountRouter.get('', (req, res) => {
    console.log("Using account router");
    res.send("Using account router");

})

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    const currId = req.userId;
    console.log(currId);
    console.log(typeof currId)
    const details = await Account.findOne({userId: currId});
    console.log(details);
    if(details){
        res.json({
            "balance": details.balance
        })
    }
    else{
        res.send("Error while finding ");
    }

})

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const toUserId = req.body.to;
    const amt = req.body.amount;
    const fromUserId = req.userId;

    console.log("TO User ID:" + toUserId);
    console.log("From user ID: " + fromUserId);
    console.log("Amount" + amt);

    const senderAccountDetails = await Account.findOne({userId: fromUserId});
    const receiverAccountDetails = await Account.findOne({userId : toUserId});

    if(receiverAccountDetails == null || senderAccountDetails == null){
        await session.abortTransaction();
        res.status(400).json({
            message: "Invalid Account"
        })
        return;
    }

    console.log(senderAccountDetails.balance);
    if(senderAccountDetails.balance < amt){
        await session.abortTransaction();
        res.status(400).json({
            message:"Insufficient Balance"
        })
        return;
    }

    toUserNew = await Account.updateOne({userId: toUserId}, {$inc: {balance: amt}}).session(session);
    fromUserNew = await Account.updateOne({userId: fromUserId}, {$inc: {balance: -amt}}).session(session);

    await session.commitTransaction();

    res.json({
        message: "Transfer Successful"
    });

})

module.exports ={accountRouter};
