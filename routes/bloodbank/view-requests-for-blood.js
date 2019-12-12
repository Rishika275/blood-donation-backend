var router = require('express').Router();
var {connection} = require('../../config/databases')

router.get('/', (req, res, next) => {
	
	connection.query(
		'select name, contact , bloodGroup, neededBy from Requests;',
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
					othersRequests: results
				})
			}
		}
	)

}
)

module.exports = router;