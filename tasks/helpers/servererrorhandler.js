const serverErrorHandler =`exports.catchErrors = (fn) => {
    return function(req, res, next) {
        return fn(req, res, next).catch(next);
    };
};
`
exports = module.exports = serverErrorHandler;
