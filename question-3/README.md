# Question 3

FIFO / LIFO Accounting System

<br />

## Problem Statement

Implement a class that simulates a double-entry accounting system which manages inventory costs using both FIFO (First-In-First-Out) and LIFO (Last-In-First-Out) methods. Your system should record buy and sell transactions and calculate the cost of goods sold (COGS) and remaining inventory value for each method after each sale.

<br />

## Input

Buy and sell transactions specifying the quantity and unit cost/price.

<br />

## Output

COGS and remaining inventory value after each sale, calculated using both FIFO and LIFO methods.

Example Usage:

```
accounting = AccountingSystem()
accounting.record_buy(100, 20)
accounting.record_sell(80, 30)
cogs_fifo = accounting.get_cogs_fifo()
cogs_lifo = accounting.get_cogs_lifo()
```

<br />

## Solution

- Created class `AccountingSystem` to represent an accounting system with the following functionalities:

    - Add item in accounting system.
    - Calculate cost of goods dold using both FIFO and LIFO methods.
    - Calculate item ID.
    - Calculate transaction ID.
    - Print out the inventory values of all items in USD to the console.
    - Get all items in accounting system.
    - Get all transactions in accounting system.
    - Record buy transaction.
    - Record sell transaction.
    - Removes all transactions.
    - Reset all items.
    - Reset all transactions.

- Created class `Item` to represent an item.

- Created class `Transaction` to represent a transaction.

- Added 9 unit tests to test the functionality of class `AccountingSystem`:

    - Can add items in accounting system
    - Can calculate item id correctly
    - Can calculate transaction id correctly
    - Can get all transactions
    - Can record buy transaction
    - Can record sell transaction
    - Can get correct cogs using fifo method
    - Can get correct cogs using lifo method
    - Can get correct remaining inventory values for all items in accounting system

- Added 1 unit tests to test the functionality of class `Item`:

    - Can get value to use
