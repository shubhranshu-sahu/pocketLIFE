const jwt = require('jsonwebtoken')

module.exports = checkAuth = (req, res, next) => {
    const token = req.headers.authorization;
    
    if(!token) return res.status(401).json({"message":'No token in headers'});

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) return res.sendStatus(403);
        next();
    });
}