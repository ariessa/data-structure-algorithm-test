/**
 * Calculate the average of trade transaction price
 *
 * @param {Number[]} prices - A list of trade transaction price.
 * @returns {Number} The average of trade transaction price.
 */
function calculate_avg(prices) {
    let result = prices.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0) / prices.length;

    return result;
}

module.exports = { calculate_avg };
