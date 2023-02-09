const express = require("express");
const {
   addTransaction,
   getAllTransaction,
} = require("../controllers/transaction");
const router = express.Router();

router.route("/transaction").get(getAllTransaction).post(addTransaction);

module.exports = router;
