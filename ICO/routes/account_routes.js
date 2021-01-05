const { Router } = require( 'express');
const router = Router()
const { sendEthSigned } = require( '../controller/account_controller');


router.post('/send', sendEthSigned)


module.exports = router