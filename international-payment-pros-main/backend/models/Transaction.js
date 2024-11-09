const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipientName: {
        type: String,
        required: true
    },
    recipientsBank: {
        type: String,
        required: true
    },
    recipientsAccountNumber: {
        type: String,
        required: true
    },
    amountToTransfer: {
        type: Number,
        required: true
    },
    swiftCode: {
        type: String
    },
    transactionType: {
        type: String,
        enum: ['Local', 'International'],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
