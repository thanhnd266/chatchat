const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

const comparePassword = (password, hash) => {
    let isValid = bcrypt.compareSync(password, hash);
    return isValid;
}

module.exports = {
    hashPassword,
    comparePassword,
}