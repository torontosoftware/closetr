# closetr-api

This is the back-end project for Closetr. It uses Node and Express to complement
our Angular front-end, by providing RESTful APIs. We use MongoDB as our database,
with Mongoose as it's own front-end.

The contents of this README contain information about routes and functionality
implemented in the back-end, as well as the structure of the code. Feel free to
take a look at the project, and run it for yourself via the instructions found
later in this document.

### Structure:

We use a standard format that is used for Node and Express applications.

In `/app.js`, we configure the back-end and all it's required services, and start
the server to start listening for API calls.

#### Routes:

As mentioned, Closetr uses RESTful APIs to power the back-end. It provides
services which are called by the front-end through routes. Contained in the
folder /routes are the different classes of routes and their mapped functions.

Here are the different classes of routes currently implemented:

- **index (`/routes/index.js`)** : This is the default route which was generated
as a placeholder. For now it simply lets us know if the back-end has started up
properly when we try to start the server.

- **clothes (`/routes/clothes.js`)** : This class corresponds to the APIs that a
re related to creating/updating/deleting information about clothes. Currently
there are two APIs implemented here: one to retrieve all clothing, and another
to add information about clothing to our database.

### Development Server

Run the back-end server for yourself!

Before anything, ensure that you've installed the required dependencies running
`npm-install` in the root folder (closetr-api). You will need to install Node
if you haven't done so yet. See how to do that [here](https://www.npmjs.com/get-npm).

Run npm start in the root folder (closetr-api) for a development server. The
server will be set up at `http://localhost:8080`. You may also want to run the
front-end web project (go to closetr-web to see how this works) locally.

The app will automatically reload if you change any of the source files
(like the routes)!
