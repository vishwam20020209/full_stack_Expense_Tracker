import React from 'react';

export function StatsDisplay({ total, expenseCount, categorySummary }) {
    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    // Get category colors - rotate through a palette
    const categoryColors = [
        '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
        '#10b981', '#3b82f6', '#ef4444', '#14b8a6',
    ];

    const getCategoryColor = (index) => {
        return categoryColors[index % categoryColors.length];
    };

    const categoryEntries = Object.entries(categorySummary).sort((a, b) => b[1] - a[1]);

    return (
        <div className="stats-section">
            {/* Main Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">Total Expenses</div>
                    <div className="stat-value highlight">{formatCurrency(total)}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Number of Entries</div>
                    <div className="stat-value">{expenseCount}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Average per Entry</div>
                    <div className="stat-value">
                        {expenseCount > 0 ? formatCurrency(total / expenseCount) : '₹0.00'}
                    </div>
                </div>
            </div>

            {/* Category Summary */}
            {categoryEntries.length > 0 && (
                <div style={{ marginTop: 'var(--spacing-lg)' }}>
                    <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginBottom: 'var(--spacing-md)' }}>
                        BREAKDOWN BY CATEGORY
                    </h3>
                    <div className="category-summary">
                        {categoryEntries.map(([category, amount], index) => (
                            <div key={category} className="category-item">
                                <span className="category-name">
                                    <span
                                        className="category-dot"
                                        style={{ backgroundColor: getCategoryColor(index) }}
                                    ></span>
                                    {category}
                                </span>
                                <span className="category-amount">{formatCurrency(amount)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
