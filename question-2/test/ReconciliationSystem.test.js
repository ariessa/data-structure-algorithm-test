const ReconciliationSystem = require('../class/ReconciliationSystem');

describe("class ReconciliationSystem", () => {
    let recon_system;

    beforeEach(() => {
        // Create an instance of ReconciliationSystem object
        recon_system = new ReconciliationSystem();

        // Insert multiple transactions in reconciliation system
        recon_system.insert_transaction('tx123', 1617906000, 100);
        recon_system.insert_transaction('tx124', 1617906000, 100);
    });

    afterEach(() => {
        // Remove all transactions except those with id 'tx123' and 'tx124'
        Object.keys(recon_system).forEach((key) => ['tx123', 'tx124'].includes(key) || delete recon_system[key]);
    });

    test("can get all transactions", () => {
        expect(recon_system).toEqual({
            tx123: {
              id: 'tx123',
              timestamp: 1617906000,
              amount: 100,
              isReconciled: false
            },
            tx124: {
              id: 'tx124',
              timestamp: 1617906000,
              amount: 100,
              isReconciled: false
            }
          }
        );
    });

    test("cannot insert transaction with the same id", () => {
        expect(() => {
            recon_system.insert_transaction('tx123', 1617906000, 100);
          }).toThrow(new Error("Transaction id already exists in reconciliation system!"));
    });

    test("can insert transaction", () => {
        recon_system.insert_transaction('tx125', 1617906000, 100);

        expect(recon_system).toHaveProperty('tx125');
    });

    test("cannot reconcile transaction that's already mark as reconciled", () => {
        recon_system.reconcile_transaction('tx123');

        expect(() => {
            recon_system.reconcile_transaction('tx123');
          }).toThrow(new Error("Transaction is already mark as reconciled!"));
    });

    test("can reconcile transaction", () => {
        recon_system.reconcile_transaction('tx123');

        expect(recon_system['tx123']['isReconciled']).toEqual(true);
    });

    test("cannot search for non-existent transaction", () => {
        expect(() => {
            recon_system.search_transaction("tx125");
          }).toThrow(new Error("Transaction id cannot be found in reconciliation system!"));
    });

    test("can search for existing transaction", () => {
        expect(recon_system.search_transaction('tx123')).toEqual({"amount": 100, "id": "tx123", "isReconciled": false, "timestamp": 1617906000});
    });
});