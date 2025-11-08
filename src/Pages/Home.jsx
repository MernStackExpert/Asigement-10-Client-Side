import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import {
  FaWallet,
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa";
import { AuthContext } from "../Provider/AuthContext";
import { useAxios } from "../Hooks/useAxios";

const Home = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const [financialData, setFinancialData] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.email) return;

      try {
        const res = await axios.get(`/transactions?email=${user.email}`);
        const transactions = res.data || [];

        let income = 0;
        let expense = 0;

        transactions.forEach((t) => {
          if (t.type.toLowerCase() === "income") {
            income += parseFloat(t.amount);
          } else if (t.type.toLowerCase() === "expense") {
            expense += parseFloat(t.amount);
          }
        });

        const balance = income - expense;

        setFinancialData({ income, expense, balance });
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, [user?.email]);

  return (
    <div className="container mx-auto px-4 py-16 space-y-24">
      <section>
        <div className="hero min-h-[50vh] bg-base-200 rounded-2xl shadow-lg">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold text-primary">
                Take Control of Your Finances
              </h1>
              <p className="py-6 text-lg">
                FinEase helps you track your income and expenses, set budgets,
                and achieve your financial goals with ease.
              </p>
              <Link
                to="/add-transaction"
                className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white shadow-lg transform transition-transform hover:scale-105"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-10">
          Your Financial Overview
        </h2>

        <div className="stats stats-vertical lg:stats-horizontal shadow-xl w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaWallet className="text-4xl" />
            </div>
            <div className="stat-title">Current Balance</div>
            <div className="stat-value">
              ${financialData.balance.toLocaleString()}
            </div>
            <div className="stat-desc">Your total savings</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-success">
              <FaArrowCircleUp className="text-4xl" />
            </div>
            <div className="stat-title">Total Income (This Month)</div>
            <div className="stat-value text-success">
              ${financialData.income.toLocaleString()}
            </div>
            <div className="stat-desc">Your income sources</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-error">
              <FaArrowCircleDown className="text-4xl" />
            </div>
            <div className="stat-title">Total Expenses (This Month)</div>
            <div className="stat-value text-error">
              ${financialData.expense.toLocaleString()}
            </div>
            <div className="stat-desc">Your spending categories</div>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-xl border border-base-300 transform transition-transform hover:-translate-y-2">
            <figure className="px-10 pt-10">
              <FaLightbulb className="text-6xl text-warning" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">Smart Budgeting Tips</h2>
              <p>
                Follow these tips to be more frugal and achieve your goals
                faster.
              </p>
              <ul className="list-disc list-inside text-left mt-4 space-y-2">
                <li>Track every single expense.</li>
                <li>Create a realistic monthly budget.</li>
                <li>Build an emergency fund.</li>
                <li>Cut down on non-essential spending.</li>
              </ul>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-300 transform transition-transform hover:-translate-y-2">
            <figure className="px-10 pt-10">
              <FaChartLine className="text-6xl text-info" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">
                Why Financial Planning Matters
              </h2>
              <p>
                Planning gives you control over your money and reduces financial
                stress.
              </p>
              <ul className="list-disc list-inside text-left mt-4 space-y-2">
                <li>Helps you achieve long-term goals.</li>
                <li>Prepares you for financial emergencies.</li>
                <li>Guides your investment decisions.</li>
                <li>Ensures a secure financial future.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
