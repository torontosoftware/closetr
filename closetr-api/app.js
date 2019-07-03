require('./config/aliases')
const middleware = require('./middleware')

const app = middleware.get_express_app()
// Setup server port
const port = process.env.PORT || 8080;

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("listening on port " + port);
});
