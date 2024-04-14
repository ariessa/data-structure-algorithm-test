const AccountingSystem = require('../class/AccountingSystem');

describe("class AccountingSystem", () => {
    let accounting_system = new AccountingSystem();;

    beforeEach(() => {
        // Insert multiple buy transactions in accounting system
        accounting_system.record_buy(100, 30);
        accounting_system.record_sell(200, 20);
        accounting_system.record_buy(300, 10);
    });

    afterEach(() => {
        // Remove all transactions
        accounting_system.reset_txs();
    });

    test("can calculate transaction id correctly", () => {
        accounting_system.record_buy(300, 10);

        expect(accounting_system.get_txs()[3]["id"]).toEqual(4);
    });

    test("can get all transactions", () => {
        expect(accounting_system.get_txs()).toEqual(
            [
                {"id": 1, "price_per_unit": 30, "quantity": 100, "total_price": 3000, "type": "buy"}, 
                {"id": 2, "price_per_unit": 20, "quantity": 200, "total_price": 4000, "type": "sell"}, 
                {"id": 3, "price_per_unit": 10, "quantity": 300, "total_price": 3000, "type": "buy"}
            ]
        );
    })

    test("can record buy transaction", () => {
        accounting_system.record_buy(99, 9);

        expect(accounting_system.get_txs().at(-1)).toEqual({
            id: 4,
            price_per_unit: 9,
            quantity: 99,
            total_price: 891,
            type: 'buy'
          }
        );
    });

    test("can record sell transaction", () => {
        accounting_system.record_sell(111, 11);

        expect(accounting_system.get_txs().at(-1)).toEqual({
            id: 4,
            price_per_unit: 11,
            quantity: 111,
            total_price: 1221,
            type: 'sell'
          }
        );
    });

    test("can get correct cogs using fifo method", () => {
        accounting_system.record_sell(2, 4);
        accounting_system.record_sell(3, 6);

        console.log("cogs fifo: ", accounting_system.get_cogs_fifo());
        console.log("cogs lifo: ", accounting_system.get_cogs_lifo());
    });

    test("can get correct cogs using lifo method", () => {

    });

    // test("can get correct remaining inventory value using fifo method", () => {

    // });

    // test("can get correct remaining inventory value using lifo method", () => {

    // });
});