const router = require('express').Router();
const axios = require('axios');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res)=>{
    try{
        const code = req.query.code;
        const data = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${code}`)
        
        const {email, name, picture} = data.data;
        console.log(`email: ${email}, name: ${name}, image: ${picture}`);
        
        let user = await UserModel.findOne({email: email});
        if(!user){
            user = await UserModel.create({
                name: name,
                email: email,
                image: picture
            })
            console.log("user created successfully");
        }
        
        const {_id} = user;
        const token = jwt.sign({_id, email}, process.env.JWT_SECRET, {expiresIn:"1d"});
        res.status(200).json({
            message: "Success",
            token: token,
            user
        })
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",
        })
    }
});

module.exports = router;