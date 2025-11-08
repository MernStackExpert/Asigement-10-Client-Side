import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  FaWallet,
  FaDollarSign,
  FaPencilAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaUser,
  FaPlus,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';
import { useAuthContext } from '../Context/useAuthContext';

const AddTransaction = () => {
  const [transactionType, setTransactionType] = useState('Expense');
  const { user } = useAuthContext();

  const incomeCategories = [
    { value: 'Salary', label: 'Salary' },
    { value: 'Bonus', label: 'Bonus' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Investment', label: 'Investment' },
    { value: 'Other', label: 'Other (Income)' },
  ];

  const expenseCategories = [
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Rent', label: 'Rent' },
    { value: 'Bills', label: 'Bills' },
    { value: 'Transport', label: 'Transport' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Health', label: 'Health' },
    { value: 'Savings', label: 'Savings' },
    { value: 'Other', label: 'Other (Expense)' },
  ];

  const categoriesToShow =
    transactionType === 'Income' ? incomeCategories : expenseCategories;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const amount = form.amount.value;
    const description = form.description.value;
    const date = form.date.value;

    if (!category || !amount || !description || !date) {
      toast.error('Please fill all fields.');
      return;
    }

    const transactionData = {
      type: transactionType,
      category,
      amount: parseFloat(amount),
      description,
      date,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    console.log(transactionData);
    toast.success('Transaction Added Successfully!');
    form.reset();
    setTransactionType('Expense');
  };

  const handleTypeChange = (type) => {
    setTransactionType(type);
    document.getElementsByName('category')[0].value = '';
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="card max-w-4xl mx-auto shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body p-6 md:p-10">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Add New Transaction
          </h2>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-lg font-semibold">
                Transaction Type
              </span>
            </label>
            <div className="join w-full">
              <button
                type="button"
                onClick={() => handleTypeChange('Income')}
                className={`join-item btn btn-lg flex-1 ${
                  transactionType === 'Income'
                    ? 'btn-success text-white'
                    : 'btn-outline btn-success'
                }`}
              >
                <FaArrowUp /> Income
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('Expense')}
                className={`join-item btn btn-lg flex-1 ${
                  transactionType === 'Expense'
                    ? 'btn-error text-white'
                    : 'btn-outline btn-error'
                }`}
              >
                <FaArrowDown /> Expense
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaWallet />
                <select
                  name="category"
                  className="grow bg-transparent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categoriesToShow.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaDollarSign />
                <input
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  step="0.01"
                  className="grow"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaCalendarAlt />
                <input type="date" name="date" className="grow" />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaPencilAlt />
                <input
                  type="text"
                  name="description"
                  placeholder="Add a short note..."
                  className="grow"
                />
              </label>
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text">User Name (Read-only)</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 text-gray-500 bg-base-200">
                <FaUser />
                <input
                  type="text"
                  value={user?.displayName || 'Loading...'}
                  disabled
                  className="grow bg-transparent"
                />
              </label>
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text">User Email (Read-only)</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 text-gray-500 bg-base-200">
                <FaEnvelope />
                <input
                  type="email"
                  value={user?.email || 'Loading...'}
                  disabled
                  className="grow bg-transparent"
                />
              </label>
            </div>
          </div>

          <div className="form-control mt-10">
            <button
              type="submit"
              className="btn btn-primary btn-lg bg-gradient-to-r from-primary to-secondary text-white w-full"
            >
              <FaPlus />
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;