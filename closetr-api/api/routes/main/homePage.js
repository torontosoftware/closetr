module.exports = (req, res, next) => {
    res.json({
        status: 200,
        message: 'Welcome to the Closetr API!',
    });
}