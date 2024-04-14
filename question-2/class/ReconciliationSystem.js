const Transaction = require('./Transaction');

/** Class representing a reconciliation system. */
class ReconciliationSystem {
    /**
     * Check if a transaction id exists.
     * @param {String} - The id of the transaction.
     * @return {Boolean|Error} - If the transaction id exists, return true. Else, return false.
     */
    #doesTransactionExists(tx_id) {
        return this.hasOwnProperty(tx_id);
    }

    /**
     * Insert a transaction.
     * @param {String} - The id of the transaction.
     * @param {BigInt} - The timestamp of the transaction.
     * @param {Number} - The amount of the transaction.
     */
    insert_transaction(tx_id, tx_timestamp, tx_amount) {
        // If the transaction id exists, throw an error.
        // Else, insert the transaction.
        if (this.#doesTransactionExists(tx_id)) {
            throw new Error("Transaction id already exists in reconciliation system!");
        } else {
            this[`${tx_id}`] = new Transaction(tx_id, tx_timestamp, tx_amount);
        }
    }


    /**
     * Mark a transaction as reconciled.
     * @param {String} tx_id - The id of the transaction.
     */
    reconcile_transaction(tx_id) {
        // If the transaction id exists, check if the transaction has been reconciled.
        // Else, throw an error.
        if (this.#doesTransactionExists(tx_id)) {
            // If the transaction not been reconciled, mark it as reconciled.
            // Else, throw an error
            if (!this[`${tx_id}`]["isReconciled"]) {
                this[`${tx_id}`]["isReconciled"] = true;
            } else {
                throw new Error("Transaction is already mark as reconciled!");
            }
        } else {
            throw new Error("Transaction id cannot be found in reconciliation system!");
        }
    }

    /**
     * Search a transaction.
     * @param {String} tx_id - The id of the transaction.
     * @return {Transaction} The Transaction object.
     */
    search_transaction(tx_id) {
        // If transaction id exists, return the transaction.
        // Else, throw an error
        if (this.#doesTransactionExists(tx_id)) {
            return this[`${tx_id}`];
        } else {
            throw new Error("Transaction id cannot be found in reconciliation system!");
        }
    }
}

module.exports = ReconciliationSystem;
