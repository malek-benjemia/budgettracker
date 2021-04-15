const router = require('express').Router();
const {
  getAllTransaction,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../../controllers/transaction-controller');

// /api/transactions
router
  .route('/')
  .get(getAllTransaction)
  .post(createTransaction);

// /api/transactions/:id
router
  .route('/:id')
  .get(getTransactionById)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
