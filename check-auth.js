const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
exports.middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ") [1];
        console.log(token);
        const verify = jwt.verify(token,'this .dummy text');
        console.log(verify);
        if(verify)
        {
            next();
        }
        else{
            return res.status(501).json({
                msg:'admin not found'

            })
        }
    }
    catch (error) {
        return res.status(401).json({
            msg: 'invalid token'
        })
    }
}
module.exports= router