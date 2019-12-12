var router = require('express').Router();

router.use('/availableblood', require('./view-available-blood'));
router.use('/bloodexpiry', require('./view-expirydate-of-blood'));
router.use('/bloodrequests', require('./view-requests-for-blood'));
router.use('/viewdonors', require('./view-potential-donors'))
// donor to blood bank
router.use('/storenewblood', require('./store-new-blood'));
//donate blood to requester
router.use('/donateblood', require('./donate-blood'));


module.exports = router;
