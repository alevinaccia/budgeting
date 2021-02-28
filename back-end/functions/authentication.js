const bcrypt = require('bcryptjs');
const User = require('../model/user.js');

const login = async (name, pass) => {
    //Hash password
    const salt = await bcrypt.genSalt(5);
    const hashPass = await bcrypt.hash(pass, salt);

    return user = new User({
        username: name,
        password: hashPass
    });
}

exports.login = login;