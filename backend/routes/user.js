const express = require('express');
const z = require('zod');
const { User, Account } = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');


const signupSchema = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
});

const userRouter = express.Router();
 
userRouter.get('/', function (req, res) {
    console.log("User router Working");
    res.end();
})

userRouter.post('/signup', async function(req, res){
    const currUser = req.body;

    const parseOp = signupSchema.safeParse(currUser);
    if(parseOp.success == false){
        res.status(411).send({
            msg: "Incorrect inputs"
        });
        return;
    }

    // Check in DB and add if not present

    const userPresent = await User.findOne({
        username: currUser.username
    });

    console.log(userPresent);

    if(userPresent){
        res.status(411).send({msg: "Username already exists"});
        return;
    }

    const newUser = User(currUser);
    newUser.save().then((savedUser) => {
        const userId = savedUser._id
        const jwtStr = jwt.sign({userId: userId}, JWT_SECRET);

        const balancePromise = Account.create({
            userId: userId,
            balance: 1 + Math.random() * 10000
        })

        balancePromise.then(() => {
            res.status(200).send({
                msg: "User created successfully",
                token: jwtStr
            });
        })
        
    })

})

userRouter.post('/signin', async function(req, res){
    const signinData = req.body;

    const signinDataSchema = z.object({
        username: z.string().email(),
        password : z.string()
    });

    const parseOp = signinDataSchema.safeParse(signinData);
    if(parseOp.success == false){
        res.status(411).send("Invalid Sign-in data");
        return;
    }

    const userCreds = await User.findOne({
        username: signinData.username,
        password: signinData.password
    })

    if(!userCreds){
        res.status(411).send({msg:"Username or password is incorrect"});
        return;
    }
    const jwtStr = jwt.sign({userId: userCreds._id}, JWT_SECRET);

    res.status(200).send({
        msg:"Signed In Successfully",
        token: jwtStr
    });


})

userRouter.put('/', authMiddleware, async (req, res) => {
    
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const updatedDetails = {}
    
    if(password){
        updatedDetails["password"] = password;
    }

    if(firstName){
        updatedDetails["firstName"] = firstName;
    }

    if(lastName){
        updatedDetails["lastName"] = lastName;
    }

    const filter = {_id: req.userId}
    console.log(filter);
    console.log(updatedDetails);

    const result = await User.findOneAndUpdate(filter, updatedDetails);
    console.log(result);

    if(!result){
        res.status(411).send({
            message: "Error while updating information"
        })
        return;
    }

    res.send({
        message: "Updated successfully"
    });

})

userRouter.get('/bulk', async (req, res)=>{
    nameFilter = req.query.filter;

    const result = await User.find({ $or: [{firstName: {$regex: nameFilter}}, {lastName: {$regex: nameFilter}}]});

    res.status(200).json({
        users: result.map((userInfo) => {
            return {
                username: userInfo.username,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName, 
                _id: userInfo._id
            }
        })
    });
})

module.exports = {
    userRouter,
}