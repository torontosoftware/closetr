module.exports = (...functions) =>
    args =>
    functions.reduceRight((arg, fn) =>
    fn(arg), args);