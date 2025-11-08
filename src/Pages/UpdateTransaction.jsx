import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaWallet,
  FaDollarSign,
  FaPencilAlt,
  FaCalendarAlt,
  FaSave,
  FaArrowUp,
  FaArrowDown,
  FaRegLightbulb,
} from 'react-icons/fa';
import { useAxios } from '../Hooks/useAxios';

const UpdateTransaction = () => {
  const loadedData = useLoaderData();
  const loadedTransaction = loadedData.transaction;

  const [transactionType, setTransactionType] = useState(
    loadedTransaction.type
  );
  const axios = useAxios();
  const navigate = useNavigate();

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

  const handleUpdate = async (e) => {
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

    const updatedData = {
      type: transactionType,
      category,
      amount: parseFloat(amount),
      description,
      date,
    };

    try {
      await axios.patch(`/transactions/${loadedTransaction._id}`, updatedData);
      toast.success('Transaction Updated Successfully!');
      navigate(`/my-transactions`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update transaction.');
    }
  };

  const handleTypeChange = (type) => {
    setTransactionType(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-4 md:p-8 flex items-center justify-center">
      <div className="card w-full max-w-4xl shadow-xl bg-white rounded-lg overflow-hidden">
        <div className="card-body p-6 md:p-10">
          <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-2">
            Update Transaction
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Refine your financial record with precision.
          </p>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="form-control mb-8">
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Transaction Type
                </span>
              </label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => handleTypeChange('Income')}
                  className={`flex-1 btn btn-lg border-none rounded-lg text-lg transition-all duration-300 ${
                    transactionType === 'Income'
                      ? 'bg-emerald-500 text-white shadow-md hover:bg-emerald-600'
                      : 'bg-transparent text-gray-600 hover:text-emerald-500'
                  }`}
                >
                  <FaArrowUp /> Income
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange('Expense')}
                  className={`flex-1 btn btn-lg border-none rounded-lg text-lg transition-all duration-300 ${
                    transactionType === 'Expense'
                      ? 'bg-rose-500 text-white shadow-md hover:bg-rose-600'
                      : 'bg-transparent text-gray-600 hover:text-rose-500'
                  }`}
                >
                  <FaArrowDown /> Expense
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700">Category</span>
                </label>
                <label className="input input-bordered flex items-center gap-3 bg-gray-50 border border-gray-200 focus-within:border-indigo-400">
                  <FaWallet className="text-gray-400" />
                  <select
                    name="category"
                    className="grow bg-transparent outline-none appearance-none"
                    defaultValue={loadedTransaction.category}
                  >
                    <option value="" disabled className="text-gray-500">
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
                  <span className="label-text text-gray-700">Amount</span>
                </label>
                <label className="input input-bordered flex items-center gap-3 bg-gray-50 border border-gray-200 focus-within:border-indigo-400">
                  <FaDollarSign className="text-gray-400" />
                  <input
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    step="0.01"
                    className="grow outline-none"
                    defaultValue={loadedTransaction.amount}
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700">Date</span>
                </label>
                <label className="input input-bordered flex items-center gap-3 bg-gray-50 border border-gray-200 focus-within:border-indigo-400">
                  <FaCalendarAlt className="text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    className="grow outline-none"
                    defaultValue={loadedTransaction.date}
                  />
                </label>
              </div>

              <div className="form-control md:col-span-2 flex flex-col">
                <label className="label">
                  <span className="label-text text-gray-700 mb-2">Description</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Add a detailed note about this transaction..."
                  className="textarea textarea-bordered h-32 bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:outline-none resize-y w-full"
                  defaultValue={loadedTransaction.description}
                />
              </div>
            </div>

            <div className="form-control mt-10">
              <button
                type="submit"
                className="btn btn-primary btn-lg w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaSave className="text-xl" />
                Update Transaction
              </button>
            </div>
          </form>

          <div className="text-center mt-8 text-gray-500 text-sm flex items-center justify-center gap-2">
            <FaRegLightbulb className="text-indigo-400" />
            <span>Ensure all details are accurate before saving.</span>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} newestOnTop />
    </div>
  );
};

export default UpdateTransaction;