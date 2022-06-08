// Imports
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token invalide"});
            } else {
                next();
            }
        });
    } else {
        res.status(401).json({ error:"accès non authorisé" });
    }
};