const getApp = require('./getApp');
const { getExpressPort } = require('@config')

module.exports = () => {
  let app = getApp();
  const port = getExpressPort();
  app.listen(port, () => {
       console.log("listening on port " + port);
  });
};
