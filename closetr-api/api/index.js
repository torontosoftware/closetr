const middleware = require('./middleware');

function run_app () {
  const app = middleware.get_express_app();
  const port = const port = process.env.PORT || 8080;
  app.listen(port, function () {
       console.log("listening on port " + port);
  });
}

module.exports = run_app
