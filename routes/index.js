var router = require('express').Router();

router.use('/bloodbank', require('./bloodbank'));
router.use('/user', require('./user'));
router.use('/home', require('./home'));

module.exports = router;