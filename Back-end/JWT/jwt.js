let jwt = require('jsonwebtoken');
let dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = {
  tokenPassword : process.env.JWT_SECRET,
  generateToken: function (user) {
    return jwt.sign({
      userId: user.id,
    },
      this.tokenPassword,
      {
        expiresIn: '24h'
      })
  },
  getId: function (data) {
    if (data.length > 1) {
      let token = data.split(' ')[1];
      try {
        let decodedToken = jwt.verify(token, this.tokenPassword)
        id = decodedToken.id
        return id
      }
      catch (err) {
        return err
      }
    };
  }
}