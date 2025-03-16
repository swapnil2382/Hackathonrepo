import React, { useState } from "react";

const Calculator = () => {
  // Model: Initial State
  const [formData, setFormData] = useState({
    type: "stocks",
    amount: "",
    rate: "",
    years: "",
  });

  const [result, setResult] = useState(null);

  const [suggestion, setSuggestion] = useState("");

  const estimateProfit = (type, amount, rate, years) => {
    let adjustedRate = parseFloat(rate);

    if (type === "stocks") adjustedRate += 2;
    if (type === "bonds") adjustedRate -= 1;
    if (type === "insurance") adjustedRate -= 2;

    const total = amount * Math.pow(1 + adjustedRate / 100, years);
    const profit = total - amount;

    return {
      total: total.toFixed(2),
      profit: profit.toFixed(2),
      adjustedRate: adjustedRate.toFixed(2),
    };
  };

  const getSuggestion = (rate) => {
    if (rate >= 10) return "Consider investing in stocks for higher returns.";
    if (rate >= 6) return "Bonds might offer stable returns.";
    return "Insurance could be safer but slower growing.";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "rate") {
      const suggestionText = getSuggestion(parseFloat(e.target.value));
      setSuggestion(suggestionText);
    }
  };

  const handleEstimate = (e) => {
    e.preventDefault();
    const { type, amount, rate, years } = formData;
    const profitData = estimateProfit(
      type,
      parseFloat(amount),
      parseFloat(rate),
      parseFloat(years)
    );
    setResult(profitData);
  };

  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      padding: "40px",
      gap: "40px",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
      color: "black",
      backgroundColor: "white",
      minHeight: "100vh",
    },
    box: {
      flex: "1 1 45%",
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
    },
    input: {
      padding: "10px",
      marginTop: "5px",
      marginBottom: "15px",
      width: "100%",
      backgroundColor: "white",
      color: "black",
      border: "none",
      borderRadius: "6px",
      border: "1px solid #00bcd4",
    },
    button: {
      padding: "10px 15px",
      marginRight: "10px",
      marginTop: "10px",
      backgroundColor: "#00bcd4",
      color: "black",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
    label: {
      fontWeight: "bold",
    },
    section: {
      marginTop: "20px",
      padding: "15px",
      backgroundColor: "white",
      borderRadius: "8px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Left Side: Calculator */}
      <div style={styles.box}>
        <h2> Investment Calculator</h2>
        

        <form onSubmit={handleEstimate}>
          <label style={styles.label}>Investment Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="stocks">Stocks</option>
            <option value="bonds">Bonds</option>
            <option value="insurance">Insurance</option>
          </select>

          <label style={styles.label}>Amount ($):</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Annual Return Rate (%):</label>
          <input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Duration (Years):</label>
          <input
            type="number"
            name="years"
            value={formData.years}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Estimate Profit
          </button>
        </form>

        {suggestion && (
          <div style={styles.section}>
            <strong> Suggestion:</strong> {suggestion}
          </div>
        )}
      </div>

      {/* Right Side: Results & Holdings */}
      <div style={styles.box}>
        {result && (
          <div style={styles.section}>
            <h3> Estimated Profit</h3>
            <p>
              <strong>Adjusted Rate:</strong> {result.adjustedRate}%
            </p>
            <p>
              <strong>Total Value:</strong> ${result.total}
            </p>
            <p>
              <strong>Profit:</strong> ${result.profit}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
