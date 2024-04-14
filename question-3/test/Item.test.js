const Item = require('../class/Item');

describe("class Item", () => {
    let item;

    test("can get value to use", () => {
        item = new Item(1, 'Item A', 100, 10);
        item.set_cost_price_per_unit(20);

        expect(item.get_value_to_use()).toEqual(20);

    });
});
