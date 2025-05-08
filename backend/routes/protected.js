const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send("You In a Protected Route");
})

module.exports = router;