const router = require('express').Router();
const mongoose = require('mongoose');
const DateModel = require('../models/dateModel')
const jwt = require('jsonwebtoken');
const yearModel = require('../models/yearModel');

router.get('/', async (req, res)=>{
    const {date} = (req.query);
    const token = req.headers.authorization;
    const {_id} = jwt.decode(token);

    const entry = await DateModel.findOne({date: date, user: _id})
    // console.log(entry);
    res.json(entry);
})

router.post('/', async (req, res)=>{
    try{
        const {title, content, image, mood } = req.body;
        const token = req.headers.authorization;
        const {_id} = jwt.decode(token)
        console.log(_id);

        const date = new Date(req.body.date);
        console.log(date)
        let entry = await DateModel.findOne({user: _id, date})
        if(!entry){
            entry = await DateModel.create({
                user: _id,
                title, 
                content, 
                image, 
                mood,
                date
            })
        }else{
            entry.title = title;
            entry.content = content;
            entry.image = image;
            entry.mood = mood;
            entry.save();
        }
        
        console.log("user found")
        let yearEntry = await yearModel.findOne({user: _id, year:date.getFullYear()});
        if(!yearEntry){
            yearEntry = await yearModel.create({
                user: _id,
                year: date.getFullYear(),
                data: [{date, mood}]
            })
        }else{
            let exists = false; 
            yearEntry.data.forEach((item, index)=>{
                if(new Date(item.date).getDate() == date.getDate() && new Date(item.date).getMonth() == date.getMonth()){
                    exists = true;
                    yearEntry.data[index].mood = mood;
                    console.log("Date Found!!!");
                }
            })
            if(!exists){
                yearEntry.data = [...yearEntry.data, {date, mood}];
            }
            yearEntry.save()
        }

        res.status(200).send("Wonderful");
    }catch(err){
        res.status(500).json({"message":"Server Error While Adding Date Entry", "Error": err})
    }
})

    
module.exports = router;