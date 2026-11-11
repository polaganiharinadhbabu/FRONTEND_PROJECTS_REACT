
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Load transactions from localStorage when the app starts
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  // Save transactions whenever the list changes
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Calculate total balance
  const balance = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  // Calculate total income
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Calculate total expenses
  const expenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Format numbers as USD currency
  const formatCurrency = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

  // Add a new transaction
  const addTransaction = (event) => {
    event.preventDefault();

    const trimmedDescription = description.trim();
    const transactionAmount = Number(amount);

    if (!trimmedDescription) {
      alert("Please enter a description.");
      return;
    }

    if (amount === "" || !Number.isFinite(transactionAmount)) {
      alert("Please enter a valid amount.");
      return;
    }

    if (transactionAmount === 0) {
      alert("Amount cannot be zero.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description: trimmedDescription,
      amount: transactionAmount,
    };

    setTransactions((previousTransactions) => [
      ...previousTransactions,
      newTransaction,
    ]);

    setDescription("");
    setAmount("");
  };

  // Delete a transaction
  const removeTransaction = (id) => {
    setTransactions((previousTransactions) =>
      previousTransactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  };

  // Show latest transactions first
  const sortedTransactions = [...transactions].reverse();

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      {/* Balance section */}
      <div className="balance-container">
        <h2>Your Balance</h2>
        <h1>{formatCurrency(balance)}</h1>

        <div className="summary">
          <div className="income">
            <h3>Income</h3>
            <p>{formatCurrency(income)}</p>
          </div>

          <div className="expenses">
            <h3>Expenses</h3>
            <p>{formatCurrency(Math.abs(expenses))}</p>
          </div>
        </div>
      </div>

      <div className="main-content">
        {/* Transactions list */}
        <div className="transaction-container">
          <h2>Transactions</h2>

          {sortedTransactions.length === 0 ? (
            <p className="empty-message">
              No transactions yet. Add your first transaction!
            </p>
          ) : (
            <ul className="transaction-list">
              {sortedTransactions.map((transaction) => (
                <li
                  className={`transaction ${
                    transaction.amount > 0 ? "income-item" : "expense-item"
                  }`}
                  key={transaction.id}
                >
                  <span>{transaction.description}</span>

                  <div className="transaction-right">
                    <span>{formatCurrency(transaction.amount)}</span>

                    <button
                      className="delete-btn"
                      onClick={() => removeTransaction(transaction.id)}
                      aria-label={`Delete ${transaction.description}`}
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add transaction form */}
        <div className="form-container">
          <h2>Add Transaction</h2>

          <form onSubmit={addTransaction}>
            <div className="form-group">
              <label htmlFor="description">Description</label>

              <input
                type="text"
                id="description"
                placeholder="Enter description..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount</label>

              <input
                type="number"
                id="amount"
                step="0.01"
                placeholder="Enter amount..."
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />

              <small>Use negative (-) for expenses</small>
            </div>

            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
