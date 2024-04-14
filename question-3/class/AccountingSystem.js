const Transaction = require('./Transaction');

/** Class representing an accounting system. */
class AccountingSystem {
    #cogs_fifo = 0;
    #cogs_lifo = 0;
    #inventory_val_fifo = 0;
    #inventory_val_lifo = 0;
    #txs = new Array();

     /**
     * Calculate cost of goods sold (COGS) and remaining inventory value using either FIFO or LIFO method.
     */
     #calculate_cogs(cogs_method) {
        // Deep copy of txs array
        const cloned_txs = this.#txs.map(x => x);

        let current_tx;
        let temp_cogs;
        let temp_inventory_val;

        for (let i = 0; i < cloned_txs.length; i++) {
            if (cogs_method == "fifo") {
                current_tx = cloned_txs.shift();
            } else {
                current_tx = cloned_txs.pop();
            }

            if (current_tx["type"] == "buy") {
                temp_cogs += current_tx["total_price"];
            } else {
                temp_cogs -= current_tx["total_price"];
            }
        }

        if (cogs_method == "fifo") {
            this.#cogs_fifo = temp_cogs;
        } else {
            this.#cogs_lifo = temp_cogs;
        }
    }
     
    /**
     * Calculate transaction id.
     * @return {Number} The transaction id.
     */
    #calculate_tx_id() {
        return this.#txs.length == 0 ? 1 : this.#txs.length + 1;
    }

     /**
     * Get cost of goods sold (COGS) using FIFO method.
     * @return {Number} The cost of goods sold in USD.
     */
    get_cogs_fifo() {
        return this.#cogs_fifo;
    }

    /**
     * Get cost of goods sold (COGS) using LIFO method.
     * @return {Number} The cost of goods sold in USD.
     */
    get_cogs_lifo() {
        return this.#cogs_lifo;
    }

    /**
     * Get all transactions.
     * @return {Transaction[]} The list of transactions.
     */
    get_txs() {
        return this.#txs;
    }

    /**
     * Record buy transactions.
     * @param {Number} - The quantity of goods.
     * @param {Number} - The price per goods unit in USD
     */
    record_buy(quantity, price_per_unit) {
        this.#txs.push(new Transaction(this.#calculate_tx_id(), price_per_unit, quantity, price_per_unit * quantity, 'buy'));
    }

    /**
     * Record sell transactions using both FIFO and LIFO methods.
     * @param {Number} - The quantity of goods.
     * @param {Number} - The price per goods unit in USD
     */
    record_sell(quantity, price_per_unit) {
        this.#txs.push(new Transaction(this.#calculate_tx_id(), price_per_unit, quantity, price_per_unit * quantity, 'sell'));
        this.#calculate_cogs("fifo");
        this.#calculate_cogs("lifo");
    }

    /**
     * Removes all transactions.
     */
    reset_txs() {
        this.#txs = new Array();
    }
}

module.exports = AccountingSystem;
