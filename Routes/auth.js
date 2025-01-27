const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [

];

router.post('/register',async (req,res)=>{
    const {username,email,password,role}= req.body;
    if(!username || !email || !password || !['organizer', 'attendee'].includes(role)){
        res.status(400).send({message : 'Invalid request'});
    }
    else{
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = {
            username,
            email,
            hashedPassword,
            role
        }
        users.push(newUser);
        console.log(users);
        res.send({message : "User registered successfully"});
    }
});

module.exports = router;
