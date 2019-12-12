var router = require('express').Router();
var bcrypt = require('bcrypt');
var { connection } = require('../../config/databases');
var jwt = require('jsonwebtoken');
var validateNewBloodBank = require('../../validations/new-bb-validation')
var registrationHelper = require('./registrationHelper')

router.post('/newuser', (req, res, next) => {
	console.log("Registration of new user hit");
	
	var newUserData = {
		name: req.body.name,
		gender: req.body.gender,
		dateOfBirth: req.body.dateOfBirth,
		bloodGroup: req.body.bloodGroup,
		location: req.body.location,
		contact: req.body.contact,
		email: req.body.email,
		password: req.body.password,
	};
	let date = newUserData.dateOfBirth;
	newUserData.dateOfBirth = date.substring(0,10);

	console.log("INSERT INTO user(name,gender,dob,bloodgroup,location,contact,email,password) values ('"+newUserData.name+"','"+newUserData.gender+"','"+newUserData.dateOfBirth+"','"+newUserData.bloodGroup+"','"+newUserData.location+"','"+newUserData.contact+"','"+newUserData.email+"','"+newUserData.password+"');"	)

	registrationHelper.encryptPassword(newUserData.password, (result) => {
		if (result == null) {
			return res.status(500).json({
				errors: {
					"error": "Could not encrypt password.",
					"message": "Oops! Something went wrong on our side."
				}
			});
		}
		else {
			newUserData.password = result;

			connection.query(
				"INSERT INTO user(name,gender,dob,bloodgroup,location,contact,email,password) values ('"+newUserData.name+"','"+newUserData.gender+"','"+newUserData.dateOfBirth+"','"+newUserData.bloodGroup+"','"+newUserData.location+"','"+newUserData.contact+"','"+newUserData.email+"','"+newUserData.password+"');",
				(err, results, fields) => {
					if (err) {
						if (err.errno == 1062) {
							if (err.sqlMessage.toString().indexOf('contact') > -1) {
								return res.status(400).json({
									errors: {
										"error": "Duplicate entry",
										"message": "Contact already exists"
									}
								});
							}
							if (err.sqlMessage.toString().indexOf('email') > -1) {
								return res.status(400).json({
									errors: {
										"error": "Duplicate entry",
										"message": "Email already exists"
									}
								});
							}
						}
						else {
							//TODO: send mail to devs
							// logger.error(err.toString());
							return res.status(500).json({
								errors: {
									"error": JSON.stringify(err),
									"message": "Server Error. Please try again later."
								}
							});
						}
					}

					// registrationHelper.sendVerificationEmail(newUserData);

					return res.status(200).json({
						data: {
							"success": true,
							"message": "User Registration successful."
						}
					});
				}
			)
		}
	});

}
);


//  -------------BLOOD BANK REGISTRATION-----------------------------------
router.post('/bloodbankreg', (req, res, next) => {
	var newBloodBankData = {
		name: req.body.name,
		location: req.body.location,
		contact: req.body.contact,
		email: req.body.email,
		password: req.body.password,

	};

	// let errorMessage = validateNewBloodBank(
	// 	newBloodBankData.name,
	// 	newBloodBankData.contact,
	// 	newBloodBankData.email,
	// 	newBloodBankData.password,

	// )

	// if (errorMessage) {
	// 	return res.status(400).json({
	// 		errors: {
	// 			"error": errorMessage,
	// 			"message": errorMessage
	// 		}
	// 	});
	// }

	registrationHelper.encryptPassword(newBloodBankData.password, (result) => {
		if (result == null) {
			return res.status(500).json({
				errors: {
					"error": "Could not encrypt password.",
					"message": "Oops! Something went wrong on our side."
				}
			});
		}
		else {
			newBloodBankData.password = result;

			connection.query(
				"INSERT INTO bloddbank(name,location,contact,email,password) values ('"+newBloodBankData.name+"','"+newBloodBankData.location+"','"+newBloodBankData.contact+"','"+newBloodBankData.email+"','"+newBloodBankData.password+"');",
				(err, results, fields) => {
					if (err) {
						if (err.errno == 1062) {
							if (err.sqlMessage.toString().indexOf('contact') > -1) {
								return res.status(400).json({
									errors: {
										"error": "Duplicate entry",
										"message": "Contact already exists"
									}
								});
							}
							if (err.sqlMessage.toString().indexOf('email') > -1) {
								return res.status(400).json({
									errors: {
										"error": "Duplicate entry",
										"message": "Email already exists"
									}
								});
							}
						}
						else {
							//TODO: send mail to devs
							// logger.error(err.toString());
							return res.status(500).json({
								errors: {
									"error": err,
									"message": "Server Error. Please try again later."
								}
							});
						}
					}

					// registrationHelper.sendVerificationEmail(newUserData);

					return res.status(200).json({
						data: {
							"success": true,
							"message": "User Registration successful."
						}
					});
				}
			)
		}
	});
});


module.exports = router;