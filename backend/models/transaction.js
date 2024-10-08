const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipientName: String,
    recipientsBank: String,
    recipientsAccountNumber: String,
    amountToTransfer: Number,
    swiftCode: String,
    transactionType: String,
    status: String,
    date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;