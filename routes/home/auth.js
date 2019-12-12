var router = require('express').Router();
var bcrypt = require('bcrypt');
var { connection } = require('../../config/databases');
var jwt = require('jsonwebtoken');

//  AUTHORIZING THE BLOOD BANK
router.post('/bloodbanklogin', (req, res, next) => {
	connection.query(
		'SELECT * from bloddbank WHERE email = ? LIMIT 1', req.body.email, (err, results, fields) => {
			if (err) {
				//TODO: send mail to devs
				// logger.error(err.toString());
				return res.status(500).json({
					errors: {
						"error": err,
						"message": "Oops! Something went wrong on our side."
					}
				});
			}
			else if (results.length == 0) {
				return res.status(400).json({
					errors: {
						"error": "Invalid login credentials.",
						"message": "Invalid login credentials."
					}
				});
			}
			else if (results[0].activated == 0) {
				return res.status(403).json({
					errors: {
						"error": "Account not activated.",
						"message": "Please verify your account to login."
					}
				});
			}
			else if (results.length == 1) {
				bcrypt.compare(req.body.password, results[0].password)
					.then(isEqual => {
						if (!isEqual) {
							return res.status(400).json({
								errors: {
									"error": "Invalid login credentials.",
									"message": "Invalid login credentials."
								}
							});
						}
						else if (isEqual) {
							return res.status(200).json({
								data: {
									"success": true,
									"message": "Login Successful.",
								}
							});
						}

					})
					.catch(err => {
						// logger.error(err.toString());
						return res.status(500).json({
							errors: {
								"error": err.toString(),
								"message": "Oops! Something went wrong on our side."
							}
						});
					})
			}
			else {
				return res.status(400).json({
					errors: {
						"error": " Bad Request.",
						"message": "Oops! Something went wrong on our side."
					}
				});
			}
		}
	)
}
)

// ----------------------------  AUTHORIZING THE USER  -----------------------------------
router.post('/userlogin', (req, res, next) => {
	console.log("userlogin hit!");
	connection.query(
		'SELECT * from user WHERE email = ? LIMIT 1', [req.body.email], (err, results, fields) => {
			if (err) {
				//TODO: send mail to devs
				// logger.error(err.toString());
				return res.status(500).json({
					errors: {
						"error": err.toString(),
						"message": "Oops! Something went wrong on our side."
					}
				});
			}
			else if (results.length == 0) {
				return res.status(400).json({
					errors: {
						"error": "Invalid login credentials.",
						"message": "Invalid login credentials."
					}
				});
			}
			else if (results[0].activated == 0) {
				return res.status(403).json({
					errors: {
						"error": "Account not activated.",
						"message": "Please verify your account to login."
					}
				});
			}
			else if (results.length == 1) {
				bcrypt.compare(req.body.password, results[0].password)
					.then(isEqual => {
						if (!isEqual) {
							return res.status(400).json({
								errors: {
									"error": "Invalid login credentials.",
									"message": "Invalid login credentials."
								}
							});
						}
						else if (isEqual) {
							return res.status(200).json({
								data: {
									"success": true,
									"message": "Login Successful.",
								}
							});
						}
						// else if (isEqual) {
						// 	payload = {
						// 		"emil": results[0].email,
						// 		"username": results[0].name
						// 	}
						// 	jwt.sign(payload, secret.key, { expiresIn: '7d' }, (err, token) => {
						// 		if (err) {
						// 			// logger.error(err.toString());
						// 			return res.status(500).json({
						// 				errors: {
						// 					"error": 'Error while generating token.',
						// 					"message": "Oops! Something went wrong on our side."
						// 				}
						// 			});
						// 		}
						// 		return res.status(200).json({
						// 			data: {
						// 				"success": true,
						// 				"message": "Login Successful.",
						// 				"token": token
						// 			}
						// 		});
						// 	})
						// }
					})
					.catch(err => {
						// logger.error(err.toString());
						return res.status(500).json({
							errors: {
								"error": err.toString(),
								"message": "Oops! Something went wrong on our side."
							}
						});
					})
			}
			else {
				return res.status(400).json({
					errors: {
						"error": " Bad Request.",
						"message": "Oops! Something went wrong on our side."
					}
				});
			}
		}
	)
})

module.exports = router;