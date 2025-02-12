const request = require('supertest');
const app = require('../app');
const auth = require('../Routes/auth');
const events = require('../Routes/events');
const eventController = require('../Controllers/eventController');
describe('Virtual event management',()=>{
    let token = '';
    let event = '';
    const mockUser = {username:'sanath',email:'test@gmail.com',password:'P@ssw0rd',role:'organizer'};

    test('Should register a new user',async () =>{
        const response = await request(app)
        .post('/register')
        .send(mockUser);

        expect(response.status).toBe(200);
    });

    test('signup with missing email',async() =>{
        const response = await request(app)
        .post('/register')
        .send({username: mockUser.username, password:mockUser.password});

        expect(response.status).toBe(400);
    });

    test('login to portal', async () =>{
        const response = await request(app)
        .post('/login')
        .send({email : mockUser.email,password : mockUser.password});

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    test('login with wrong password', async () =>{
        const response = await request(app)
        .post('/login')
        .send({email : mockUser.email, password : 'testing'});

        expect(response.status).toBe(401);
    });
    
    test('creating an event',async () =>{
        const response = await request(app)
        .post('/events').set('Authorization',token)
        .send({
            "title" : "concert",
            "date"  : "2025-02-15",
            "time"  : "20:00",
            "description" : "By xyz"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.status).toBe(200);
    });

    test('Creating an event without token',async()=>{
        const response = await request(app)
        .post('/events')
        .send({
            "title" : "concert",
            "date"  : "2025-02-15",
            "time"  : "20:00",
            "description" : "By xyz"
        });
        expect(response.status).toBe(401);
    });

    test('Updating an event',async()=>{
        const response = await request(app)
        .put('/events/1').set('Authorization',token)
        .send({
            "title" : "standup",
            "date"  : "2025-02-15",
            "time"  : "20:00",
            "description" : "By abc"
        });
        expect(response.status).toBe(200);
    });

    test('Updating an event with invalid id',async () =>{
        const response = await request(app)
        .put('/events/99').set('Authorization',token)
        .send({
            "title" : "standup",
            "date"  : "2025-02-15",
            "time"  : "20:00",
            "description" : "By abc"
        });
        expect(response.status).toBe(404);
    });
});

