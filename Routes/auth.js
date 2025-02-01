const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];

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
        res.send({message : "User registered successfully"});
    }
});

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const index = users.findIndex(user => user.email === email);
    if(index == -1){
        return res.status(401).send({message :'Invalid credentials'});
    }
    
    const passwordValid = await bcrypt.compare(password,users[index].hashedPassword);
    if(!passwordValid){
        return res.status(401).send({message :'Invalid credentials'});
    }
    
    const token = jwt.sign({email: users[index].email,role : users[index].role},process.env.JWT_SECRET);
    res.send({token});
    //console.log(process.env.JWT_SECRET);
    
});

module.exports = router;
