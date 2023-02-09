const Transaction = require("../models/transaction");

// Add Transaction to DB
const addTransaction = async (req, res) => {
   const { name, date, description, price } = req.body;
   const transaction = await Transaction.create({
      name,
      description,
      date,
      price,
   });
   const allTransaction = await Transaction.find();
   res.status(200).json(allTransaction);
};

// Get All Transaction from DB
const getAllTransaction = async (req, res) => {
   const transaction = await Transaction.find();
   res.status(200).json(transaction);
};

module.exports = { addTransaction, getAllTransaction };
