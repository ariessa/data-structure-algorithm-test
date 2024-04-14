/** Class representing a transaction. */
class Transaction {
    /**
     * Create a transaction.
     */
    constructor(id, item_id, item_name, price_per_unit, quantity, total_price, type) {
        this.id = id;
        this.item_id = item_id;
        this.item_name = item_name;
        this.price_per_unit = price_per_unit;
        this.quantity = quantity;
        this.total_price = total_price;
        this.type = type;
    }
}

module.exports = Transaction;
