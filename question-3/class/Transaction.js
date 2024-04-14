/** Class representing a transaction. */
class Transaction {
    /**
     * Create a transaction.
     */
    constructor(id, price_per_unit, quantity, total_price, type) {
        this.id = id;
        this.price_per_unit = price_per_unit;
        this.quantity = quantity;
        this.total_price = total_price;
        this.type = type;
    }
}

module.exports = Transaction;
