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


