const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
    encript: (password) => {
        return crypto.createHash('sha256').update(password).digest('hex');
    },
    areEqual: (plainPassword, encriptedPassword) => {
        return this.encript(plainPassword) === encriptedPassword;
    },
    getJwtSign(user) {
        return jwt.sign({
                user
            }, process.env.login_key || 'shhhhh',
            { expiresIn: '24h' }
        );
    }
};
