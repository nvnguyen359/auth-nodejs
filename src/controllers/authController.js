
const secret = process.env.SECRET;
const expiresIn = process.env.expiresIn;
const jwt = require("jsonwebtoken");



const refreshTokenexpiresIn = process.env.refreshTokenexpiresIn;
const {CRUD} = require("./../services/CRUD");
const { validationResult } = require("express-validator");
const {  success, errorsResponse, parseJwt ,setHashPassword,isMathPassword} = require("../common/common");
const db = require("./../db/index");
const service = new CRUD();
service.tableName="users";
service.knex = db.knex;

const validateRep = (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errorsResponse(res, next, { errors: errors.array() }, 400, "http code on validation error");
        return;
    }
};
const register = async (req, res, next) => {
    console.log("register",req.body);
    validateRep(req, res,next);
   const user = req.body;
   const checkEmail = await service.getEmail(user.email);
   if(checkEmail){
       success(res,next,`Email ${user.email} already exist!`,res.statusCode,res.statusMessage);
       return;
   }
   user.password = await setHashPassword(user.password);
   const result = await service.create(user);
   if(result){
       success(res,next,"success!",201,res.statusMessage);
   }else{
    errorsResponse(res,next,null,res.statusCode,res.statusMessage);
   }

};
const login = async (req, res, next) =>{
    service.TableName="users";
    validateRep(req, res,next);
    const user = req.body;
    const checkEmail = await service.getEmail(user.email);
    if(!checkEmail){
        errorsResponse(res,next,null,401,`Email ${user.email} not found`);
        return;
    }
    const isMath = await isMathPassword(user.password,checkEmail.password);
    if(!isMath){
        errorsResponse(res,next,null,400,"Password is not correct");
        return;
    }
    const token = jwt.sign({ sub: checkEmail.id }, secret, { expiresIn: expiresIn });
    const refreshToken = jwt.sign({ sub: checkEmail.id}, `${secret}xnv_9`, { expiresIn:refreshTokenexpiresIn });
    // eslint-disable-next-line no-unused-vars
    const { password, ...result } = checkEmail;
    if(checkEmail.firstName && checkEmail.lastName)
    result.displayName =`${checkEmail.firstName} ${checkEmail.lastName}`;
	const dt = { user: result, token: token, refreshToken };
	const tokenTb = { userId: checkEmail.id, refreshToken, expiresIn, createdAt: new Date(), updatedAt: new Date() };
	await upsertToken(tokenTb);
    success(res, next, dt, 200);
};
const upsertToken = async (obj) => {
    service.TableName = "tokens";
	const checkToken = await service.getAll({ userId: obj.userId });
	if (checkToken) {
		await service.update(checkToken);
	} else {
		await service.create(obj);
		console.log("create token");
	}
};
const logout = async (req, res, next)=>{
};
// eslint-disable-next-line no-undef
module.exports = { register, login, logout };