const Transaction = require('./Transaction');
const Item = require('./Item');

/** Class representing an accounting system. */
class AccountingSystem {
    #cogs_fifo = 0;
    #cogs_lifo = 0;
    #txs = new Array();
    #items = new Object();

    /**
     * Add item in accounting system.
     */
    add_item(name, market_price_per_unit, quantity) {
        const item_id = this.#calculate_item_id();

        this.#items[item_id] = new Item(item_id, name, market_price_per_unit, quantity);
    }

    /**
     * Calculate cost of goods sold (COGS) and remaining inventory value using either FIFO or LIFO method.
     */
    #calculate_cogs(cogs_method) {
        // Deep copy of txs array
        const cloned_txs = this.#txs.map(x => x);

        let current_tx;
        let temp_cogs = 0;

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
     * Calculate item id.
     * @return {Number} The item id.
     */
    #calculate_item_id() {
        return Object.keys(this.#items).length == 0 ? 1 : Object.keys(this.#items).length + 1;
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
     * Print out the inventory values of all items in USD to the console.
     */
    get_inventory_values() {
        // Iterate over all items in accounting system
        // and display inventory values of each item.
        for (const item in this.#items) {
            console.log(`${item} - ${this.#items[item]["name"]}: ${this.#items[item].get_value()} USD`);
        }
    }

    /**
     * Get item name based on its ID.
     * @param {String} id - The id of an item.
     * @return {String} The name of an item
     */
    #get_item_name(id) {
        return this.#items[id]["name"];
    }

    /**
     * Get all items.
     * @return {Item[]} The list of items.
     */
    get_items() {
        return this.#items;
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
     * @param {Number} - The id of transaction.
     * @param {Number} - The quantity of goods.
     * @param {Number} - The price per goods unit in USD
     */
    record_buy(item_id, quantity, price_per_unit) {
        // Add new buy transaction
        this.#txs.push(new Transaction(this.#calculate_tx_id(), item_id, this.#get_item_name(item_id), price_per_unit, quantity, price_per_unit * quantity, 'buy'));

        let current_cost_price_per_unit = this.#items[item_id].get_cost_price_per_unit();
    
        // Update cost price per unit if it's lower than price per unit for the item
        if (price_per_unit > current_cost_price_per_unit) {
            this.#items[item_id].set_cost_price_per_unit(price_per_unit);
        }
    }

    /**
     * Record sell transactions.
     * @param {Number} - The id of transaction.
     * @param {Number} - The quantity of goods.
     * @param {Number} - The price per goods unit in USD
     */
    record_sell(item_id, quantity, price_per_unit) {
        // Add new sell transaction
        this.#txs.push(new Transaction(this.#calculate_tx_id(), item_id, this.#get_item_name(item_id), price_per_unit, quantity, price_per_unit * quantity, 'sell'));

        // Calculate Cost of Goods Sold using both FIFO and LIFO methods
        this.#calculate_cogs("fifo");
        this.#calculate_cogs("lifo");
    }

    /**
     * Reset all items.
     */
    reset_items() {
        this.#items = new Object();
    }

    /**
     * Reset all transactions.
     */
    reset_txs() {
        this.#txs = new Array();
    }
}

module.exports = AccountingSystem;
