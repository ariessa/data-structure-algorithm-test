const supported_assets = ['BTC', 'ETH', 'XRP'];

const unsupported_assets = ['SOL', 'ADA', 'TRX'];

const asset_dict_keys = ['avg_buy_price', 'avg_sell_price', 'pnl', 'balance'];

const transactions = new Array(
    Object.seal(new Array(1617906000, 'BTC', 'buy', 50000, 0.1)),
    Object.seal(new Array(1617906060, 'ETH', 'buy', 2000, 1)),
    Object.seal(new Array(1617906100, 'XRP', 'buy', 0.5, 1000)),
    Object.seal(new Array(1617907000, 'XRP', 'sell', 0.5, 500)),
    Object.seal(new Array(1617907060, 'BTC', 'sell', 50000, 0.09)),
    Object.seal(new Array(1617907100, 'ETH', 'sell', 3000, 1)),
    Object.seal(new Array(1617908000, 'BTC', 'buy', 51000, 0.3)),
    Object.seal(new Array(1617908060, 'ETH', 'buy', 1200, 2)),
    Object.seal(new Array(1617908100, 'XRP', 'buy', 0.6, 700)),
    Object.seal(new Array(1617909000, 'XRP', 'sell', 1, 200)),
    Object.seal(new Array(1617909060, 'BTC', 'sell', 40000, 0.02)),
    Object.seal(new Array(1617909100, 'ETH', 'sell', 3000, 1)),
);

module.exports = {
    supported_assets, 
    unsupported_assets, 
    asset_dict_keys, 
    transactions
};
