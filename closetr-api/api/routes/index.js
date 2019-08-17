const mainRouter = require('./main');
const clothesRouter = require('./users');
const usersRouter = require('./clothes');
const outfitEntriesRouter = require('./outfit_entries');

const endpoints = {
  main: '/',
  clothes: '/api/clothes/',
  users: '/api/users/',
  outfit_entries: '/api/outfitEntries/',
}

module.exports = (app) => {
  app.use(endpoints.main, mainRouter);
  app.use(endpoints.clothes, clothesRouter);
  app.use(endpoints.users, usersRouter);
  app.use(endpoints.outfit_entries, outfitEntriesRouter);
  return app;
}
