/* eslint-disable no-undef */
const { celebrate } = require("celebrate");
const { signUpUserDto, signInUserDto } = require('./../models/dtos/authDto');
const {register, login, logout } = require('../controllers/authController');
const validate = require('./../helpers/validator');
module.exports = (app) => {
app.post('/register', celebrate(signUpUserDto), validate.validateEmailAandPass(), register);
app.post('/login', celebrate(signInUserDto), validate.validateEmailAandPass(), login);
app.post('/logout', logout);
};