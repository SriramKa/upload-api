const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.cookies.jwt;

	if(token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			req.user = {
				id: decoded.id
			}
		});
		next();
	}

	else res.end('Please login for this action');
}