const validName = (name) => (/^[a-zA-Z]{3,20}$/).test(name);
const validEmail = (mail) => (/.+\@.+\..+/).test(mail);
const validTitle = (name) => (/[a-zA-Z0-9\s]\,[a-zA-Z0-9\s]/).test(name);

const passwordValidator = require('password-validator');
const password = new passwordValidator();
validPassword
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.has().symbols();
const validPassword = (pwd) => password.validate(pwd);

module.exports = {validName, validEmail, validTitle, validPassword};