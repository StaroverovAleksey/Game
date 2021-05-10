const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./constants");
module.exports = {
    async isAuth(req, res, next) {
        try {
            if (req.method === 'OPTIONS') {
                return next();
            }
            if (!req.cookies.token) {
                return res.status(401).json({});
            }
            req.user = await jwt.verify(req.cookies.token, JWT_SECRET);
            next();
        } catch (e) {
            return res.status(401).json({});
        }
    },

    async isAdmin(req, res, next) {
        try {
            if (req.method === 'OPTIONS') {
                return next();
            }
            if (!req.cookies.token) {
                return res.status(401).json({});
            }
            const decoded = await jwt.verify(req.cookies.token, JWT_SECRET);
            if (decoded.accessLevel !== 'admin') {
                return res.status(403).json({});
            }
            req.user = decoded
            next();
        } catch (e) {
            return res.status(401).json({});
        }
    }
}