const indexRouter = require('./index/index');
const usersRouter = require('./users/users');
const clothesRouter = require('./clothes/clothes');
const outfitEntriesRouter = require('./outfit_entries/outfit_entries');

function apply_routes (app) {
  app.use('/', indexRouter);
  app.use('/api/clothes/', clothesRouter);
  app.use('/api/users/', usersRouter);
  app.use('/api/outfitEntries/', outfitEntriesRouter);
  return app
}

module.exports = apply_routes;
