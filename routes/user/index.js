var router = require('express').Router();

router.use('/myrequests' , require('./my-requests'));
router.use('/my-donations' , require('./my-donations'));
// replace needforblood with sommething apt
router.use('/need-for-blood' , require('./need-for-blood')); 

module.exports = router;
