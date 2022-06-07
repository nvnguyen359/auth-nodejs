// eslint-disable-next-line no-undef
require("dotenv").config();
// eslint-disable-next-line no-undef
const errorhandler = require("./../helpers/error-handler");
// eslint-disable-next-line no-undef
const jwt = require("./../helpers/jwt");
// eslint-disable-next-line no-undef
module.exports = async(app)=>{
    app.use(jwt());
    app.use(function (err, req, res,next) {
       errorhandler(res,err);
       next();
    });
  
};