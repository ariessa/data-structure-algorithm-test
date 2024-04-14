/** Class representing an asset. */
class Asset {
    /**
     * Create an asset.
     */
    constructor() {
      this.avg_buy_price = 0;
      this.avg_sell_price = 0;
      this.pnl = 0;
      this.balance = 0;
      this.buy_prices = new Array();
      this.sell_prices = new Array();
    }
}

module.exports = Asset;
