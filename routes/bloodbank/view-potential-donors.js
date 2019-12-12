var router = require('express').Router();
var {connection} = require('../../config/databases')

router.get('/', (req, res, next) => {
	console.log('SELECT name, gender, contact, bloodgroup from user where bloodgroup = \''+req.body.bloodGroup+'\';')
	connection.query(
		'SELECT name, gender, contact, bloodgroup from user where bloodgroup = \'O\';',
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
					potentialDonors: results
				})
			}
		}
	)
}
)

module.exports = router;