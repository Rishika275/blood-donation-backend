var router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/register', require('./registration'));
router.use('/newbloodrequest', require('./request-for-blood'));

module.exports = router;
