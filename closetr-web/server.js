const express = require('express');
const path = require('path');
const morgan = require('morgan')

const app = express();
const distLocation = __dirname + '/dist/closeter';

app.use(express.static(distLocation));
app.use(morgan('dev'));
app.get('/*', (req,res) => {
    res.sendFile(
        path.join(distLocation + '/index.html')
    );
});

// Start the app by listening on the default Heroku port
const port = process.env.PORT || 8080;
app.listen(port);
console.log('Frontend Running on Port ' + port);