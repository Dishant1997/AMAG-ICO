const express = require('express');
const router = express.Router();
const { makePayment } = require('../controller/payment_controller');

router.post('/payment', makePayment);