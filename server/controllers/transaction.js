const Transaction = require("../models/transaction");

const addTransaction = async (req, res) => {
   const { name, date, description, price } = req.body;
   const transaction = await Transaction.create({
      name,
      description,
      date,
      price,
   });
   res.status(200).json({ msg: transaction });
};

module.exports = { addTransaction };
