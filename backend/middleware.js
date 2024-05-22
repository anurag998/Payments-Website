const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");


function authMiddleware(req, res, next){

    const authToken = req.headers.authorization;
    console.log(authToken);

    if(!authToken || !authToken.startsWith("Bearer ")){
        res.status(403).send({
            msg: "Access denied"
        });
    }

    const token = authToken.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
};