
import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch currencies when component loads
  useEffect(() => {

    async function fetchCurrencies() {

      try {

        const response = await fetch(
          "https://open.er-api.com/v6/latest/USD"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch currencies");
        }

        const data = await response.json();

        if (data.result !== "success") {
          throw new Error("Currency API is unavailable");
        }

        const currencyList = Object.keys(data.rates);

        setCurrencies(currencyList);

      } catch (err) {

        setError("Unable to load currencies. Please refresh.");

      }

    }

    fetchCurrencies();

  }, []);

  // Convert currency
  async function convertCurrency(e) {

    e.preventDefault();

    if (amount === "" || Number(amount) < 0) {
      setError("Please enter a valid amount");
      setResult("");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {

      const response = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrency}`
      );

      if (!response.ok) {
        throw new Error("Conversion failed");
      }

      const data = await response.json();

      if (data.result !== "success") {
        throw new Error("Unable to get exchange rate");
      }

      const rate = data.rates[toCurrency];

      const convertedAmount = (
        Number(amount) * rate
      ).toFixed(2);

      setResult(
        `${Number(amount)} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
      );

    } catch (err) {

      setError("Conversion failed. Please try again.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="container">

      <h1>Currency Converter</h1>

      <form onSubmit={convertCurrency}>

        <div className="form-group">

          <label>Amount</label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            min="0"
            step="any"
            onChange={(e) => setAmount(e.target.value)}
            required
          />

        </div>

        <div className="form-group">

          <label>From</label>

          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >

            {currencies.map((currency) => (

              <option key={currency} value={currency}>
                {currency}
              </option>

            ))}

          </select>

        </div>

        <div className="form-group">

          <label>To</label>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >

            {currencies.map((currency) => (

              <option key={currency} value={currency}>
                {currency}
              </option>

            ))}

          </select>

        </div>

        <button type="submit" disabled={loading || currencies.length === 0}>

          {loading ? "Converting..." : "Convert"}

        </button>

      </form>

      {error && (
        <p className="error">{error}</p>
      )}

      {result && (
        <div className="result">
          {result}
        </div>
      )}

    </div>

  );

}

export default App;
