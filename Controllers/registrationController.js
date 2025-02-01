const {events} = require('./eventController');
const {registrationMail} = require('../utils/email');

const joinEvent =async (req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const {email} = req.user;
        //const {email} = req.body;
        console.log(email);
        if(!email){
            return res.status(404).send({ message: 'Invalid Request' });
        }
        const event = events.find(event => event.id === id);
        if(event){
            if(!Array.isArray(event.attendee)){
                event.attendee=[];
            }
            if(!event.attendee.includes(email)){
                event.attendee.push(email);
                await registrationMail(email,event.title);
                res.send({message : 'Registration successfull'});
            }
            else{
                return res.send({message: 'Already registered'});
            }
        }
        else{
            return res.status(404).send({ message: "Invalide Request" });
        }
    }catch(error){
        res.status(500).send({ error: error.message });
    }
    
};

module.exports = {joinEvent};
