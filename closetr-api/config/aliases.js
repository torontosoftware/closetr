const moduleAlias = require('module-alias');
const path = require('path');

moduleAlias.addAlias('@common', path.join(__dirname, '/../common'));
moduleAlias.addAlias('@routes', path.join(__dirname, '/../api/routes'));
moduleAlias.addAlias('@api', path.join(__dirname, '/../api'));
moduleAlias.addAlias('@db', path.join(__dirname, '/../api/db'));
moduleAlias.addAlias('@config', path.join(__dirname, '/./'));
moduleAlias.addAlias('@utils', path.join(__dirname, '/../utils'));