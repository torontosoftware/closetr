const index_router = require('./index');
const users_router = require('./users');
const clothes_router = require('./clothes');
const outfit_entries_router = require('./outfit_entries');

const endpoints = {
  index: '/',
  clothes: '/api/clothes/',
  users: '/api/users/',
  outfit_entries: '/api/outfitEntries/',
}

function apply_routes (app) {
  app.use(endpoints.index, indexRouter);
  app.use(endpoints.clothes, clothesRouter);
  app.use(endpoints.users, usersRouter);
  app.use(endpoints.outfit_entries, outfitEntriesRouter);
  return app
}

module.exports = {apply_routes};
