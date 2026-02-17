import React, { useState } from 'react';
import { useExpenses } from './hooks/useExpenses';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { FilterControls } from './components/FilterControls';
import { StatsDisplay } from './components/StatsDisplay';
import { useToast } from './components/Toast';
import './App.css';

function App() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast, ToastContainer } = useToast();

    const {
        expenses,
        categories,
        loading,
        error,
        filter,
        total,
        expenseCount,
        categorySummary,
        addExpense,
        updateFilter,
        refetch,
    } = useExpenses();

    const handleSubmit = async (expenseData) => {
        setIsSubmitting(true);
        try {
            await addExpense(expenseData);
            addToast('Expense added successfully!', 'success');
        } catch (err) {
            addToast(err.message || 'Failed to add expense', 'error');
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">💰 Expense Tracker</h1>
                <p className="app-subtitle">Track your spending, understand your finances</p>
            </header>

            <main className="main-content">
                {/* Left Panel - Add Expense Form */}
                <ExpenseForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

                {/* Right Panel - Expense List & Stats */}
                <div className="expense-list-section">
                    {/* Stats Display */}
                    <StatsDisplay
                        total={total}
                        expenseCount={expenseCount}
                        categorySummary={categorySummary}
                    />

                    {/* Filter Controls */}
                    <FilterControls
                        filter={filter}
                        categories={categories}
                        onFilterChange={updateFilter}
                    />

                    {/* Expense List */}
                    <ExpenseList
                        expenses={expenses}
                        loading={loading}
                        error={error}
                        onRetry={refetch}
                    />
                </div>
            </main>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
}

export default App;
