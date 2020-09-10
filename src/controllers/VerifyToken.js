const jwt = require('jsonwebtoken');
const config = require('../config');


//Este codigo nos ayuda a validar de manera global el token en todo el codigo 

function verifyToken(req, res, next){
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message:'No has provisto un token'
        });
    }

    const decoded =  jwt.verify(token, config.secret);
    req.userId = decoded.id
    next();

}

module.exports = verifyToken;

