const express = require('express');
const authRouter = require('./routes/auth');
const proRouter = require('./routes/protected');
const yearRouter = require('./routes/year')
const dateRouter = require('./routes/date')
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv').config();
const checkAuth = require('./middleware/checkAuth');

const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); 
// app.use(bodyParser.urlencoded())
app.use(cors());

const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8080;

mongoose.connect(uri).then(()=>{
    console.log("Connect to DB");
}).catch((err)=>console.log("faliled to connect to DB", err));

app.get('/', (req, res) => {
    res.send("Hi");
})

app.use('/protected', checkAuth, proRouter);

app.use('/date', checkAuth, dateRouter);
app.use('/year', checkAuth, yearRouter)
app.use('/auth', authRouter);

app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));