const process_trade_tx = require('../process_trade_tx');
const { unsupported_assets, asset_dict_keys, transactions } = require('../lib/constants');

describe("function process_trade_tx", () => {
    test("process supported assets only", () => {
        // Add unsupported assets to list of trade transactions
        transactions.push(
            Object.seal(new Array(1617910000, 'SOL', 'buy', 140, 10)),
            Object.seal(new Array(1617910000, 'ADA', 'buy', 0.5, 1000)),
            Object.seal(new Array(1617910000, 'TRX', 'buy', 0.1, 10000)),
        );

        expect(unsupported_assets in process_trade_tx(transactions)).toBe(false);

        // Remove unsupported assets from list of trade transactions
        transactions.splice(transactions.length - 3, 3);
    });

    test("returns a dictionary of supported assets' dictionary with correct keys", () => {
        expect(new Set(Object.keys(process_trade_tx(transactions)['BTC']))).toEqual(new Set(asset_dict_keys));
    });

    test("returns correct average buy price", () => {
        expect(process_trade_tx(transactions)['BTC']['avg_buy_price']).toEqual(50500);
        expect(process_trade_tx(transactions)['ETH']['avg_buy_price']).toEqual(1600);
        expect(process_trade_tx(transactions)['XRP']['avg_buy_price']).toEqual(0.55);
    });

    test("returns correct average sell price", () => {
        expect(process_trade_tx(transactions)['BTC']['avg_sell_price']).toEqual(45000);
        expect(process_trade_tx(transactions)['ETH']['avg_sell_price']).toEqual(3000);
        expect(process_trade_tx(transactions)['XRP']['avg_sell_price']).toEqual(0.75);
    });

    test("returns correct profit / loss", () => {
        expect(process_trade_tx(transactions)['BTC']['pnl']).toEqual(-15000);
        expect(process_trade_tx(transactions)['ETH']['pnl']).toEqual(1600);
        expect(process_trade_tx(transactions)['XRP']['pnl']).toEqual(-470);
    });

    test("returns correct balance of asset", () => {
        expect(process_trade_tx(transactions)['BTC']['balance']).toEqual(0.29);
        expect(process_trade_tx(transactions)['ETH']['balance']).toEqual(1);
        expect(process_trade_tx(transactions)['XRP']['balance']).toEqual(1000);
    });
});
