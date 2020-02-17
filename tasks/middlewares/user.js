const userMiddleware = `export default function userMiddleware(req, res, next) {
    next();
}
`;

exports = module.exports = userMiddleware;
