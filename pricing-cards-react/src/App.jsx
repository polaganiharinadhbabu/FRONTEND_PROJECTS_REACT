
import { useState } from "react";
import "./App.css";

function App() {
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("");

  const plans = [
    {
      name: "Basic",
      monthlyPrice: 9,
      yearlyPrice: 90,
      description: "Perfect for getting started",
      features: [
        "5 Projects",
        "Basic Support",
        "10 GB Storage",
        "Basic Analytics",
      ],
    },
    {
      name: "Pro",
      monthlyPrice: 19,
      yearlyPrice: 190,
      description: "Best for growing businesses",
      features: [
        "Unlimited Projects",
        "Priority Support",
        "50 GB Storage",
        "Advanced Analytics",
      ],
      popular: true,
    },
    {
      name: "Premium",
      monthlyPrice: 39,
      yearlyPrice: 390,
      description: "For professional teams",
      features: [
        "Unlimited Projects",
        "24/7 Support",
        "Unlimited Storage",
        "Advanced Analytics",
        "Team Collaboration",
      ],
    },
  ];

  const handlePlanSelection = (planName) => {
    setSelectedPlan(planName);
  };

  return (
    <div className="pricing-container">
      <header>
        <h1>Choose Your Plan</h1>
        <p>Simple pricing for everyone</p>
      </header>

      <div className="billing-toggle">
        <button
          className={billing === "monthly" ? "active" : ""}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </button>

        <button
          className={billing === "yearly" ? "active" : ""}
          onClick={() => setBilling("yearly")}
        >
          Yearly
        </button>
      </div>

      <div className="pricing-cards">
        {plans.map((plan) => {
          const price =
            billing === "monthly"
              ? plan.monthlyPrice
              : plan.yearlyPrice;

          return (
            <div
              className={`pricing-card ${
                plan.popular ? "popular" : ""
              }`}
              key={plan.name}
            >
              {plan.popular && (
                <span className="popular-label">Most Popular</span>
              )}

              <h2>{plan.name}</h2>

              <p className="description">{plan.description}</p>

              <div className="price">
                <span className="currency">$</span>
                <span className="amount">{price}</span>
                <span className="period">
                  /{billing === "monthly" ? "month" : "year"}
                </span>
              </div>

              <ul className="features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className="check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="choose-btn"
                onClick={() => handlePlanSelection(plan.name)}
              >
                Choose {plan.name}
              </button>
            </div>
          );
        })}
      </div>

      {selectedPlan && (
        <div className="selection-message">
          You selected the {selectedPlan} plan!
          <button onClick={() => setSelectedPlan("")}>×</button>
        </div>
      )}
    </div>
  );
}

export default App;
