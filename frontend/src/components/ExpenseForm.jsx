import React, { useState } from 'react';

// Predefined categories for the expense tracker
const CATEGORIES = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Personal Care',
    'Other',
];

export function ExpenseForm({ onSubmit, isSubmitting }) {
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Validate form fields
    const validate = () => {
        const newErrors = {};

        // Amount validation
        if (!formData.amount) {
            newErrors.amount = 'Amount is required';
        } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be a positive number';
        } else if (parseFloat(formData.amount) > 9999999999) {
            newErrors.amount = 'Amount is too large';
        }

        // Category validation
        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        // Date validation
        if (!formData.date) {
            newErrors.date = 'Date is required';
        }

        // Description length validation
        if (formData.description && formData.description.length > 500) {
            newErrors.description = 'Description must be 500 characters or less';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validate();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ amount: true, category: true, date: true, description: true });

        if (!validate()) {
            return;
        }

        try {
            await onSubmit({
                amount: parseFloat(formData.amount).toFixed(2),
                category: formData.category,
                description: formData.description.trim() || null,
                date: formData.date,
            });

            // Reset form on success
            setFormData({
                amount: '',
                category: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
            });
            setTouched({});
            setErrors({});
        } catch (error) {
            // Error is handled by parent component
        }
    };

    const showError = (field) => touched[field] && errors[field];

    return (
        <div className="card expense-form">
            <h2 className="form-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Add Expense
            </h2>

            <form onSubmit={handleSubmit} className="form-grid">
                <div className="form-row">
                    {/* Amount Field */}
                    <div className="form-group">
                        <label htmlFor="amount">Amount *</label>
                        <div className="amount-input-wrapper">
                            <span className="currency-symbol">₹</span>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="0.00"
                                step="0.01"
                                min="0.01"
                                className={showError('amount') ? 'input-error' : ''}
                                disabled={isSubmitting}
                            />
                        </div>
                        {showError('amount') && <span className="error-text">{errors.amount}</span>}
                    </div>

                    {/* Date Field */}
                    <div className="form-group">
                        <label htmlFor="date">Date *</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={showError('date') ? 'input-error' : ''}
                            disabled={isSubmitting}
                        />
                        {showError('date') && <span className="error-text">{errors.date}</span>}
                    </div>
                </div>

                {/* Category Field */}
                <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={showError('category') ? 'input-error' : ''}
                        disabled={isSubmitting}
                    >
                        <option value="">Select a category</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {showError('category') && <span className="error-text">{errors.category}</span>}
                </div>

                {/* Description Field */}
                <div className="form-group">
                    <label htmlFor="description">Description (optional)</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="What was this expense for?"
                        maxLength={500}
                        className={showError('description') ? 'input-error' : ''}
                        disabled={isSubmitting}
                    />
                    {showError('description') && <span className="error-text">{errors.description}</span>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner"></span>
                            Adding...
                        </>
                    ) : (
                        'Add Expense'
                    )}
                </button>
            </form>
        </div>
    );
}
