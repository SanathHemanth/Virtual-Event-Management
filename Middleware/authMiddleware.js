const jwt = require('jsonwebtoken');

// const verifyJWT = (req, res, next) => {
//     const token = req.headers["authorization"];
//     if (token) {
//         const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decodeToken;
//         if (req.user.role !== 'organizer') {
//             return res.status(403).send({ message: 'Unauthorized' });
//         }
//         next();
//     }
//     else {
//         return res.status(403).send({ message: 'Invalid token' });
//     }
//     next();
// }

const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    if(!token){
        return res.status(401).send({ message: 'Access denied. No token provided' });
    }
    try{
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodeToken;
        next();
    }catch{
        res.status(400).send({ message: 'Invalid Token' });
    }
};

const verifyRole = (role) =>{
    return (req,res,next) =>{
        if (!req.user || req.user.role !== role) {
            return res.status(403).send({ message: 'Unauthorized' });
        }
        next();
    }  
};

module.exports = {verifyJWT,verifyRole};