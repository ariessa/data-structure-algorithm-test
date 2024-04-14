/** Class representing an item. */
class Item {
    #cost_price_per_unit = 0;
    #value_to_use = 0;
    #value = 0;

    /**
     * Create an item.
     */
    constructor(id, name, market_price_per_unit, quantity) {
        this.id = id;
        this.name = name;
        this.market_price_per_unit = market_price_per_unit;
        this.quantity = quantity;
    }

    /**
     * Get cost price of item per unit in USD.
     * @return {Number} The cost price of item per unit in USD.
     */
    get_cost_price_per_unit() {
        return this.#cost_price_per_unit;
    }

    /**
     * Get item value to use in USD.
     * @return {Number} The item value to use in USD.
     */
    get_value_to_use() {
        return this.#value_to_use;
    }

    /**
     * Get item value in USD.
     * @return {Number} The item value in USD.
     */
    get_value() {
        return this.#value;
    }

    /**
     * Set cost price of item per unit in USD.
     * @param {Number} price - The cost price of item per unit in USD.
     */
    set_cost_price_per_unit(price) {
        this.#cost_price_per_unit = price;

        // Update value to use and value
        this.#set_value_to_use();
        this.#set_value();
    }

    /**
     * Set value to use for an item in USD.
     */
    #set_value_to_use() {
        this.#value_to_use = Math.min(this.#cost_price_per_unit, this.market_price_per_unit);
    }

    /**
     * Set value for an item in USD.
     */
    #set_value() {
        this.#value = this.#value_to_use * this.quantity;
    }
}

module.exports = Item;
