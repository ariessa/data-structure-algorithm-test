# Question 1
Multi-Asset Dynamic P&L Calculation

<br />

## Problem Statement

You are tasked with developing a function that processes a stream of trade transactions for multiple assets. Each transaction contains information about the asset being traded, the type of trade (buy or sell), the price, and the quantity. Your function should calculate and maintain the dynamic average buy and sell prices, as well as the Profit & Loss (P&L) and the balance of each asset.

<br />

## Input

A list of trade transactions, where each transaction is represented as a tuple (timestamp, asset, type, price, quantity).

- The asset is a string identifier for the asset (e.g., `BTC`, `ETH`, `XRP`).
- The type is a string that can be either `buy` or `sell`.

<br />

## Output

A data structure (e.g., a dictionary) that holds the current average buy price, average sell price, P&L, and the balance for each asset after processing all transactions.

Example Usage:

```
transactions = [
    (1617906000, 'BTC', 'buy', 50000, 0.1),
    (1617906060, 'ETH', 'buy', 2000, 1),
    # ... more transactions ...
]

asset_pnl_dict = process_transactions(transactions)
```

Output the final state of `asset_pnl_dict`.

<br />

## Solution

- Used `Object.Seal` to make JS array immutable to emulate tuples by disallowing the addition of new properties and marks existing properties as non-configurable.

- Created function `process_trade_tx`
  - To process a stream of trade transactions for multiple assets by:
    - Calculating and maintaining the dynamic average buy price of each asset.
    - Calculating and maintaining the dynamic average sell price of each asset.
    - Calculating the Profit & Loss (P&L) of each asset.
    - Calculating the balance of each asset.

    <br />

    Example of output
    ```
    {
      BTC: {
        avg_buy_price: 50500,
        avg_sell_price: 45000,
        pnl: -15000,
        balance: 0.29
      },
      ETH: {
        avg_buy_price: 1600,
        avg_sell_price: 3000,
        pnl: 1600,
        balance: 1
      },
      XRP: {
        avg_buy_price: 0.55,
        avg_sell_price: 0.75,
        pnl: -470,
        balance: 1000
      }
    }
    ```

- Added 6 unit tests to test the functionality of function `process_trade_tx`:
    - Process supported assets only
    - Returns a dictionary of supported assets' dictionary with correct keys
    - Returns correct average buy price
    - Returns correct average sell price
    - Returns correct profit / loss
    - Returns correct balance of asset
