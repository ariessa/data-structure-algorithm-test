# Question 4

Front-End Reconciliation Tool

<br />

## Problem Statement

Create a simple front-end application that displays a list of financial transactions and allows users to reconcile them. The application should fetch transactions from a backend service and enable marking transactions as reconciled, with the display updating in real-time.

<br />

## Technical Requirements

- Use HTML, CSS, and JavaScript (or a framework of your choice).
- Display transactions with fields: id, description, amount, reconciled.
- Implement functionality to mark a transaction as reconciled.
- Style reconciled transactions to distinguish them visibly.

<br />

## Deliverables

Source code for the application.
A working demo that can run in a browser.

Example Mock Data:

```
[
    { "id": 1, "description": "Payment Received", "amount": 1500.00, "reconciled": false },
    { "id": 2, "description": "Vendor Payment", "amount": -500.00, "reconciled": false },
    // ... more transactions ...
]
```

<br />

## Instructions

- Fetch and list the transactions.
- Implement a button to mark a transaction as reconciled.
- Update the transaction's reconciled state and the display accordingly.
