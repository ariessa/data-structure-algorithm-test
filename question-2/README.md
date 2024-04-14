# Question 2

Reconciliation Data Structure

<br />

## Problem Statement

Design and implement a data structure that can efficiently manage financial transactions (debits and credits) for the purpose of reconciliation. The data structure should support operations to insert new transactions, search for a transaction by an identifier, and mark transactions as reconciled.

<br />

## Input

Operations to insert, search, and reconcile transactions.

<br />

## Output

For search operations, return the transaction if found.

For reconcile operations, mark the transaction as reconciled.

Example Usage:

```
recon_system = ReconciliationSystem()
recon_system.insert_transaction('tx123', 1617906000, 100)
transaction = recon_system.search_transaction('tx123')
recon_system.reconcile_transaction('tx123')
```

<br />

## Solution

- Created class `ReconciliationSystem` to represent a reconciliation system with the following functionalities:

    - Insert a transaction.
    - Reconcile a transaction by its ID.
    - Search for a transaction by its ID.

- Created class `Transaction` to represent a transaction.

- Added 7 unit tests to test the functionality of class `ReconciliationSystem`:

    - Can get all transactions
    - Cannot insert transaction with the same id
    - Can insert transaction
    - Cannot reconcile transaction that's already mark as reconciled
    - Can reconcile transaction
    - Cannot search for non-existent transaction
    - Can search for existing transaction
