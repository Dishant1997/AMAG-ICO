const { Router } = require('express');
const router = Router()
const { buyTokens, info, changeRound, renounceOwnership, transferOwnership } = require('../controller/ico_controller');


router.post('/buytokens', buyTokens);
router.get('/info', info);
router.post('/changeRound', changeRound);
router.post('/renounceOwnership', renounceOwnership);
router.post('/transferOwnership', transferOwnership);


module.exports = router