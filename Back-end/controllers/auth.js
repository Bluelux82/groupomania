const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwtId = require('../JWT/jwt');
dotenv.config({ path: './.env' });

// Database connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSSWORD,
    database: process.env.DATABASE
});
// Register
exports.register = (req, res, next) => {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body; // set value
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            throw error;
        } // If one users already have this email
        if (results.length > 0) {
            // return 401
            return res.status(401).json({ error: "Adresse email déjà prise !" });
            // Else
        } else {
            // Hash the password whit bcrypt.hash
            let hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            // insert all informations into new users
            db.query('INSERT INTO users SET ?', { firstName: firstName, lastName: lastName, email: email, password: hashedPassword, }, (error, results) => {
                if (error) {
                    throw error;
                } else {
                    // Return 200
                    console.log(results);
                    return res.status(200).json({ messsage: 'Compte crée avec succès !' });
                }
            })
        }
    });
};
// Login
exports.login = (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body; // set value
    // if email or password empty send 401 
    if (!email || !password) return res.status(401).json({ error: "Entrée votre email et mots de passe !" });
    // else
    else {
        // get user from email
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.log(error)
                res.send({ error: error })
            }
            // if email do not correspond to user or password isn't good
            if (!results.length > 0 || !await bcrypt.compare(password, results[0].password)) {
                // send 401 and error
                return res.status(401).json({ error: "Email ou mots de passe incorrect !" })
                // else
            } else {
                // create a token whit jws.sign
                // - Payload = userId
                // - Secret key
                // - Expire in 1 day
                const jsontoken = jwt.sign({ id: results[0].id}, process.env.JWT_SECRET, {expiresIn: 86400});
                console.log(jsontoken)
                res.status(200).json({
                    message: "Login successfully",
                    token: jsontoken
                });
            }
        })
    }
};
// Profile
exports.profile = (req, res, next) => {
    let userId = jwtId.getId(req.headers.authorization); // get userId
    console.log(userId)
    // get id and isAdmin value
    db.query("SELECT id, isAdmin FROM users WHERE id = ?", userId, (error, results) =>{
        if(error){
            console.log(error)
            res.status(500).json(error)
        } else {
            console.log(results)
            res.status(200).json(results)
        }
    })
};