var router = require('express').Router();
var { connection } = require('../../config/databases')

router.get('/', (req, res, next) => {
	connection.query(
		'SELECT donationId , bloodgroup, amtOfBlood, expiryDate from donations d inner join user u on d.user_userId = u.userId order by bloodGroup, expiryDate',
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
				return res.status(200).json({
					expiryDates: results
				})
			}
		}
	)
}
)

module.exports = router;