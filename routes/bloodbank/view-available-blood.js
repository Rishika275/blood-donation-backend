var router = require('express').Router();
var {connection} = require('../../config/databases')

router.get('/', (req, res, next) => {
	connection.query(
		'SELECT bloodgroup , sum(amtOfBlood) as totalAmtOfBlood from donations d inner join user u on u.userId = d.user_userId group by bloodgroup',
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
					availBlood: results
				})
			}
		}
	)
}
)

module.exports = router;