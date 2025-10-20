const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req,res,next) =>{
    try {
        // step-1 ==> read the token from the req cookies
    const cookies = req.cookies;
    const {token} = cookies;
    if(!token){
        throw new Error("Token not found"); 
    }
    // step-2 ==> verify the token
    const decodedObj = await jwt.verify(token,'SECRET_KEY');

    // step-3 ==> find the user
    const {_id} = decodedObj;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }
    req.user = user;
    next();
    } catch (error) {
        res.status(401).json({message:error.message});
    }
};

module.exports = {userAuth};