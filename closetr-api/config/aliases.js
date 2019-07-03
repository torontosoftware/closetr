const moduleAlias = require('module-alias');
const path = require('path');

moduleAlias.addAlias('@common', path.join(__dirname, '/../common'));
moduleAlias.addAlias('@routes', path.join(__dirname, '/../api/routes'));
moduleAlias.addAlias('@api', path.join(__dirname, '/../api'));
