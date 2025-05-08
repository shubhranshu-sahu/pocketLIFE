const router = require('express').Router();
const mongoose = require('mongoose');
const DateModel = require('../models/dateModel')
const jwt = require('jsonwebtoken');

router.get('/', async (req, res)=>{
    const {date} = (req.query);
    const token = req.headers.authorization;
    const {_id} = jwt.decode(token);

    const entry = await DateModel.findOne({date: date, user: _id})
    console.log(entry);
    res.send("Done");
})

router.post('/', async (req, res)=>{
    try{
        const {title, content, image, mood} = req.body;
        const token = req.headers.authorization;
        const {_id} = jwt.decode(token)
        console.log(_id);
        
        const entry = await DateModel.create({
            user: _id,
            title, 
            content, 
            image, 
            mood,
        })
        console.log(entry);
        res.status(200).send("Wonderful")
    }catch(err){
        res.status(500).send("Server Error While Adding Date Entry")
    }
})

    
module.exports = router;