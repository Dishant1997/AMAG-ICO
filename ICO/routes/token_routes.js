const express = require('express');
const router = express.Router();
const { info, approve, allowance, decreaseAllowance, increaseAllowance, balance, transfer, transferFrom } = require('../controller/token_controller');


router.get('/info', info);
router.post('/approve', approve);
router.get('/allowance', allowance);
router.post('/decreaseAllowance', decreaseAllowance);
router.post('/increaseAllowance', increaseAllowance);
router.get('/balance', balance);
router.post('/transfer', transfer);
router.post('/transferFrom', transferFrom);


module.exports = router