const AccountingSystem = require('../class/AccountingSystem');

describe("class AccountingSystem", () => {
    let accounting_system = new AccountingSystem();;

    beforeEach(() => {
        // Add multiple items in accounting system
        accounting_system.add_item('Item A', 100, 10);
        accounting_system.add_item('Item B', 200, 20);
        accounting_system.add_item('Item C', 300, 30);

        // Insert multiple buy transactions in accounting system
        accounting_system.record_buy('1', 100, 30);
        accounting_system.record_sell('2', 200, 20);
        accounting_system.record_buy('3', 300, 10);
    });

    afterEach(() => {
        // Reset all items
        accounting_system.reset_items();

        // Reset all transactions
        accounting_system.reset_txs();
    });

    test("can add items in accounting system", () => {
        expect(accounting_system.get_items()).toEqual(
            {
                "1": {
                    "id": 1,
                    "market_price_per_unit": 100,
                    "name": "Item A",
                    "quantity": 10,
                },
                "2": {
                    "id": 2,
                    "market_price_per_unit": 200,
                    "name": "Item B",
                    "quantity": 20,
                },
                "3": {
                    "id": 3,
                    "market_price_per_unit": 300,
                    "name": "Item C",
                    "quantity": 30,
                },
            }
        );
    });

    test("can calculate item id correctly", () => {
        accounting_system.add_item('Item D', 400, 40);

        expect(Object.values(accounting_system.get_items()).find(i => i.name === "Item D")?.id).toEqual(4);
    });

    test("can calculate transaction id correctly", () => {
        accounting_system.record_buy(2, 200, 20);

        expect(accounting_system.get_txs()[3]["id"]).toEqual(4);
    });

    test("can get all transactions", () => {
        expect(accounting_system.get_txs()).toEqual(
            [
                {"id": 1, "item_id": "1", "item_name": "Item A", "price_per_unit": 30, "quantity": 100, "total_price": 3000, "type": "buy"}, 
                {"id": 2, "item_id": "2", "item_name": "Item B", "price_per_unit": 20, "quantity": 200, "total_price": 4000, "type": "sell"}, 
                {"id": 3, "item_id": "3", "item_name": "Item C", "price_per_unit": 10, "quantity": 300, "total_price": 3000, "type": "buy"}
            ]
        );
    })

    test("can record buy transaction", () => {
        accounting_system.record_buy(1, 100, 10);

        expect(accounting_system.get_txs().at(-1)).toEqual({
            id: 4,
            item_id: 1,
            item_name: 'Item A',
            price_per_unit: 10,
            quantity: 100,
            total_price: 1000,
            type: 'buy'
          }
        );
    });

    test("can record sell transaction", () => {
        accounting_system.record_sell(1, 100, 10);

        expect(accounting_system.get_txs().at(-1)).toEqual({
            id: 4,
            item_id: 1,
            item_name: 'Item A',
            price_per_unit: 10,
            quantity: 100,
            total_price: 1000,
            type: 'sell'
          }
        );
    });

    test("can get correct cogs using fifo method", () => {
        accounting_system.record_sell(1, 10, 10);
        accounting_system.record_sell(2, 20, 20);

        expect(accounting_system.get_cogs_fifo()).toEqual(2000);
    });

    test("can get correct cogs using lifo method", () => {
        accounting_system.record_sell(1, 10, 10);
        accounting_system.record_sell(2, 20, 20);

        expect(accounting_system.get_cogs_lifo()).toEqual(2500);
    });

    test("can get correct remaining inventory values for all items in accounting system", () => {
        accounting_system.record_sell(1, 10, 10);
        accounting_system.record_sell(2, 20, 20);
        accounting_system.record_sell(3, 30, 30);

        const logSpy = jest.spyOn(console, 'log');

        accounting_system.get_inventory_values();
      
        expect(logSpy).toHaveBeenCalledWith('1 - Item A: 300 USD');
        expect(logSpy).toHaveBeenCalledWith('2 - Item B: 0 USD');
        expect(logSpy).toHaveBeenCalledWith('3 - Item C: 300 USD');
    });
});
