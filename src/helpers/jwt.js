// eslint-disable-next-line no-undef
const { expressjwt: jwts } = require("express-jwt");
// eslint-disable-next-line no-undef
module.exports = jwt;
function jwt() {
	// eslint-disable-next-line no-undef
	const secret = process.env.SECRET;
	return jwts({ secret, algorithms: ["HS256"] }).unless({
		path: [
			// public routes that don't require authentication
			"/login",
			"/register",
			"/",
			//"/api/refresh-token",
		]
	});
}