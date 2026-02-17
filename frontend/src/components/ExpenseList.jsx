import React from 'react';

export function ExpenseList({ expenses, loading, error, onRetry }) {
    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    // Loading state
    if (loading) {
        return (
            <div className="loading-state">
                <span className="spinner" style={{ width: '32px', height: '32px' }}></span>
                <span>Loading expenses...</span>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="error-banner">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>Failed to load expenses: {error}</span>
                <button className="btn btn-secondary" onClick={onRetry}>
                    Retry
                </button>
            </div>
        );
    }

    // Empty state
    if (expenses.length === 0) {
        return (
            <div className="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <h3>No expenses yet</h3>
                <p>Add your first expense using the form</p>
            </div>
        );
    }

    return (
        <div className="expense-table-wrapper">
            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={expense.id} className="fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                            <td className="expense-date">{formatDate(expense.date)}</td>
                            <td>
                                <span className="expense-category">
                                    <span className="category-dot"></span>
                                    {expense.category}
                                </span>
                            </td>
                            <td className="expense-description" title={expense.description || '-'}>
                                {expense.description || '-'}
                            </td>
                            <td className="expense-amount" style={{ textAlign: 'right' }}>
                                {formatCurrency(expense.amount)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
