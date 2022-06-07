/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const dirTree = require("directory-tree");
// eslint-disable-next-line no-redeclare
const atob = require("atob"); Date.prototype.addHours = function (h) {
	this.setTime(this.getTime() + (h * 60 * 60 * 1000));
	return this;
};
Date.prototype.addDays = function (d) {
	this.setTime(this.getTime() + (d * 60 * 60 * 1000 * 24));
	return this;
};

const getFiles = (pathFolder) => {
	return dirTree(pathFolder);
};
const success = (res, next, data, status = 200, message = "OK") => {
	//	res.status(status).json({ errors:"ok" });
	return res.status(status).json({
		data: data,
		mes: message,
		status
	});


};
const errorsResponse = (res, next, data, status = 400, message = "error") => {
	return res.status(status).json({
		data: data,
		mes: message,
		status
	});
};
const parseJwt = (token) => {
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
		return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(""));

	return JSON.parse(jsonPayload);
};
const setHashPassword = async(password) =>{
	const salt = bcrypt.genSaltSync(saltRounds);
	return  bcrypt.hashSync(password, salt);
};
/**
 * 
 * @param {*} newPassword 
 * @param {*} hash 
 * @returns 
 */
const isMathPassword = async(newPassword,hash)=>{
	return bcrypt.compareSync(newPassword, hash);
};
// eslint-disable-next-line no-undef
module.exports = { getFiles, success, errorsResponse, parseJwt,setHashPassword,isMathPassword };