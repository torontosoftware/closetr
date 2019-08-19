const createError = require('http-errors');

module.exports = (app) => {
    app.use((req, res, next) => { next(createError(404)); });
    app.use(function(err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.json({
        message: err.message,
        error: err
        });
    });
    return app;
};
  