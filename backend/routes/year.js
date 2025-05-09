const router = require('express').Router();
const yearModel = require('../models/yearModel')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res)=>{
    // const year = req.query.year;
    const token = req.headers.authorization;
    const {_id} = jwt.decode(token);

    const data = await yearModel.find({user:_id });
    if(!data){
        return res.status(500).send('No Data Found for this year');
    }

    var newData = [];
    data.forEach(element => {
        element.data.forEach(item=>{
            newData.push(item);
        })
    });

    res.json(newData);
})

router.get('/used', async (req,res)=>{
    const token = req.headers.authorization;
    const {_id} = jwt.decode(token);
    const data = await yearModel.find({user:_id });
    if(!data){
        return res.status(500).send('No Data Found for this year');
    }
    var years = [];
    console.log(data);
    data.forEach(item=>{
        years.push(item.year);
    })
    res.json(years);

})

module.exports = router