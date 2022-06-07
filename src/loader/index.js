/* eslint-disable no-undef */
//Nơi import và load các module đã được cấu hình từ các module nhỏ.

const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = async(app)=>{
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: "application/json", limit: "10mb" }));
	app.use(bodyParser.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors({ origin: "*" }));
   
};