const { Transaction } = require('../models');

const transactionController = {
  // get all transactions
  getAllTransaction(req, res) {
    Transaction.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbtransactionData => res.json(dbtransactionData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one transaction by id
  getTransactionById({ params }, res) {
    Transaction.findOne({ _id: params.id })
      .select('-__v')
      .then(dbtransactionData => res.json(dbtransactionData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createtransaction
  createTransaction({ body }, res) {
    Transaction.create(body)
      .then(dbtransactionData => res.json(dbtransactionData))
      .catch(err => res.json(err));
  },

  // update transaction by id
  updateTransaction({ params, body }, res) {
    Transaction.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbtransactionData => {
        if (!dbtransactionData) {
          res.status(404).json({ message: 'No transaction found with this id!' });
          return;
        }
        res.json(dbtransactionData);
      })
      .catch(err => res.json(err));
  },

  // delete transaction
  deleteTransaction({ params }, res) {
    Transaction.findOneAndDelete({ _id: params.id })
      .then(dbtransactionData => res.json(dbtransactionData))
      .catch(err => res.json(err));
  }
};

module.exports = transactionController;
