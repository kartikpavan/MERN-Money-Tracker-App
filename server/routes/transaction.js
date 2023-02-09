const express = require("express");
const { addTransaction } = require("../controllers/transaction");
const router = express.Router();

router.route("/transaction").post(addTransaction);

module.exports = router;
