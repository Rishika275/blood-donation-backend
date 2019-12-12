var router = require('express').Router();
var connection = require('../../config/databases')

router.post('/', (req, res, next) => {
	connection.query(
		'SELECT bb.name, amtofblood, date from donations d inner join bloodbank bb where bb.bbid = d.bbid and d.userid = ?',
		token.userid,
		(err , results, fields)=> {
			if(err){
				//HANDLE ERROR
			}
			res.send(JSON.stringify(results));
		}
	)

}
)

module.exports = router;