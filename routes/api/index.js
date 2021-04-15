const router = require('express').Router();
const transactionRoutes = require('./transaction-routes');

router.use('/transactions', transactionRoutes);

module.exports = router;
