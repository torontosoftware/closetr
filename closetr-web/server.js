const express = require('express');
const path = require('path');

const app = express();
const distLocation = __dirname + '/dist/closetr';

app.use(express.static(distLocation));

app.get('/*', (req,res) => {
    res.sendFile(
        path.join(distLocation + '/index.html')
    );
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);