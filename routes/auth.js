const express = require('express');

const { authLogin } = require('../controller/auth.controller');

const router = express.Router();

router.post('/api/signin', authLogin);

module.exports = router;