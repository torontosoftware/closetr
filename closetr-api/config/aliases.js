const moduleAlias = require('module-alias');
const path = require('path');

moduleAlias.addAlias('@common', path.join(__dirname, '/../components/common'));
moduleAlias.addAlias('@components', path.join(__dirname, '/../components'));
