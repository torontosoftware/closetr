module.exports = () => {
    user = process.env.DB_USER;
    pass = process.env.DB_PASS;
    host = process.env.DB_HOST;
    port = process.env.DB_PORT;
    name = process.env.DB_NAME;
    return 'mongodb://' + user + ':' + pass + '@' + host + ':' + port + '/' + name;
};
