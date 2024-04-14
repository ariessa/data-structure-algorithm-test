/** Class representing a transaction. */
class Transaction {
    /**
     * Create a transaction.
     */
    constructor(id, timestamp, amount) {
        this.id = id;
        this.timestamp = timestamp;
        this.amount = amount;
        this.isReconciled = false;
    }
}

module.exports = Transaction;
