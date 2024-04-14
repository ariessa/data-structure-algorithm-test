const { supported_assets } = require('./lib/constants');
const { calculate_avg } = require('./lib/utils');

const Asset = require('./class/Asset');

/**
 * Process a stream of trade transactions for multiple assets
 * by calculating and maintain the dynamic average buy and sell prices, 
 * the Profit & Loss (P&L) and the balance of each asset.
 *
 * @param {Tuple[]} transactions - A list of trade transactions, where each transaction is represented as a tuple (timestamp, asset, type, price, quantity).
 * @returns {Dict} The current average buy price, average sell price, P&L, and the balance for each asset after processing all transactions.
 */
function process_trade_tx(transactions) {
    let asset_pnl_dict = new Object();

    // Add supported assets inside dictionary
    for (let supported_asset of supported_assets) {
        asset_pnl_dict[supported_asset] = new Object(new Asset());
    }

    // Process trade transactions for multiple assets
    for (let i = 0; i < transactions.length; i++) {
        let isSupportedAsset = transactions[i].some(j => supported_assets.includes(j));
        
        // Process supported assets only
        if (isSupportedAsset) {
            let tx_price_per_unit = transactions[i][3];
            let tx_quantity = transactions[i][4];
            let current_tx = tx_price_per_unit * tx_quantity;

            // Check type of trade transaction, calculate average buy / sell price,
            // calculate balance of asset, and calculate profit / loss
            if (transactions[i][2] == "buy") {
                asset_pnl_dict[transactions[i][1]]["buy_prices"].push(transactions[i][3]);
                asset_pnl_dict[transactions[i][1]]["avg_buy_price"] = calculate_avg(asset_pnl_dict[transactions[i][1]]["buy_prices"]);
                asset_pnl_dict[transactions[i][1]]["balance"] += transactions[i][4];
                asset_pnl_dict[transactions[i][1]]["pnl"] -= current_tx;
            } else {
                asset_pnl_dict[transactions[i][1]]["sell_prices"].push(transactions[i][3]);
                asset_pnl_dict[transactions[i][1]]["avg_sell_price"] = calculate_avg(asset_pnl_dict[transactions[i][1]]["sell_prices"]);
                asset_pnl_dict[transactions[i][1]]["balance"] -= transactions[i][4];
                asset_pnl_dict[transactions[i][1]]["pnl"] += current_tx;
            }
        }
    }

    // Delete keys buy_prices and sell_prices from supported assets' dictionary
    for (let supported_asset of supported_assets) {
        delete asset_pnl_dict[supported_asset]['buy_prices'];
        delete asset_pnl_dict[supported_asset]['sell_prices'];
    }

    return asset_pnl_dict;
}

module.exports = process_trade_tx;
