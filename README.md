# Virtual-Event-Management
✅ Project Overview

    * This project is a Node.js and Express.js-based virtual event management system that allows users to:

    * Register and log in securely.

    * Manage events, including creation, modification, and deletion.

    * Register for events as attendees.


✅ Features & Implementation

    1) User Authentication

    * Registration (POST /register): Allows users to create an account (event organizer or attendee).

    * Login (POST /login): Authenticates users and returns a JWT token.

    2) Event Management

    * Event Creation (POST /events): Only authorized users (organizers) can create events.

    * Read Events (GET /events): Fetches all available events.

    * Update Event (PUT /events/:id): Organizers can update their events.

    * Delete Event (DELETE /events/:id): Organizers can remove an event.

    3) Participant Management

    * Register for Event (POST /events/:id/register): Users can join an event.


✅ RESTful API Endpoints

    -------------------------------------------------------------------------
    Methods    |    Endpoint            | Description
    -------------------------------------------------------------------------
    POST       |    /register           | User registration
    -------------------------------------------------------------------------
    POST       |    /login              | User login
    -------------------------------------------------------------------------
    GET        |    /events             | Get all events
    -------------------------------------------------------------------------
    POST       |    /events             | Create a new event(organizers only)
    -------------------------------------------------------------------------
    PUT        |    /events/:id         | Update an event(organizers only)
    -------------------------------------------------------------------------
    DELETE     |    /events/:id         | Delete an event(organizers only)
    -------------------------------------------------------------------------
    POST       |    /events/:id/register| Register for an event
    -------------------------------------------------------------------------