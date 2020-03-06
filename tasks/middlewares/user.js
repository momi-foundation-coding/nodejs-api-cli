const userMiddleware = `export default function userMiddleware(req, res, next) {
    next();
}
`;

module.exports = userMiddleware;
