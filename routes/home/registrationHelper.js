var bcrypt = require('bcrypt');

const salt_rounds = 10;
function encryptPassword(password, done) {
    bcrypt.hash(password, salt_rounds)
            .then((hash) => {
                done(hash);
            })
            .catch((err) => {
                done(null);
            });
}

exports.encryptPassword = encryptPassword;