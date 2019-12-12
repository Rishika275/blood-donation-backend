var router = require('express').Router();
var { connection } = require('../../config/databases')

// store the blood donated by donor to the blood bank
router.post('/', (req, res, next) => {
	donationDetails = {
		name: req.body.name,
		contact: req.body.contact,
		gender: req.body.gender,
		email: req.body.email,
		dob: req.body.dob,
		bloodGroup: req.body.bloodGroup,
		amtOfBlood: req.body.amtOfBlood,
		bbemail: req.body.bbemail,
		userId: '',
		bbid: '',
	}
	let date = donationDetails.dob;
	donationDetails.dob = date.substring(0,10);
	connection.query(
		"INSERT INTO user(name,gender,dob,bloodgroup,contact,email) values ('" + donationDetails.name + "','" + donationDetails.gender + "','" + donationDetails.dateOfBirth + "','" + donationDetails.bloodGroup + "','" + donationDetails.contact + "','" + donationDetails.email + "');",
		(err, results, fields) => {
			if (err) {
				return res.status(500).json({
					errors: {
						"error": JSON.stringify(err),
						"message": "Server Error. Please try again later."
					}
				});
			}
			else {
				connection.query(
					'SELECT userId from user where email = \'' + donationDetails.email + '\' LIMIT 1;',
					(err, results, fields) => {
						if (err) {
							return res.status(500).json({
								errors: {
									"error": JSON.stringify(err),
									"message": "Server Error. Please try again later."
								}
							});
						}
						else {
							console.log(results);
							donationDetails.userId = results[0].userId;
							connection.query(
								'SELECT bbid from bloddbank where email = \'' + donationDetails.bbemail + '\' LIMIT 1;',
								(err, results, fields) => {
									if (err) {
										return res.status(500).json({
											errors: {
												"error": JSON.stringify(err),
												"message": "Server Error. Please try again later."
											}
										});
									}
									else {
										donationDetails.bbid = results[0].bbid;
										connection.query(
											"INSERT INTO donations(user_userId,bloddbank_bbid,amtOfBlood,date) values('" + donationDetails.userId + "','" + donationDetails.bbid + "','" + donationDetails.amtOfBlood + "','" + donationDetails.date + "');",
											(err, results, fields) => {
												if (err) {
													return res.status(500).json({
														errors: {
															"error": JSON.stringify(err),
															"message": "Server Error. Please try again later."
														}
													});
												}
												else {
													return res.status(200).json({
														data: {
															"success": true,
															"message": "Donation Details Entry successful."
														}
													})
												}
											}
										)
									}
								}
							)
						}
					}
				)
			}
		}
	)
}
)

module.exports = router;