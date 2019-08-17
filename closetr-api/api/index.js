const get_express_app = require('./middleware');

function run_app () {
  let app = get_express_app();
  const port = process.env.PORT || 8080;
  app.listen(port, function () {
       console.log("listening on port " + port);
  });
}

module.exports = {run_app}
