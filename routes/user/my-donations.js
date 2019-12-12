var router = require('express').Router();
var { connection } = require('../../config/databases')

router.get('/', (req, res, next) => {
	console.log(req);
	let query = 'SELECT bb.name, amtOfBlood, date from donations d ' +
		'inner join bloddbank bb on bb.bbid = d.bloddbank_bbid ' +
		'inner join user u on d.user_userId = u.userId ' +
		'where u.email = \'rishika.blue27@gmail.com\';';

		

	connection.query(
		query,
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
					dbData: results
				})
			}
		}
	)
}
)

module.exports = router;