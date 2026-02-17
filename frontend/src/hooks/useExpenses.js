import { useState, useEffect, useCallback } from 'react';
import { getExpenses, getCategories, createExpense, generateIdempotencyKey } from '../api/expenseApi';

export function useExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({ category: '', sort: 'date_desc' });

    // Fetch expenses with current filters
    const fetchExpenses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getExpenses({
                category: filter.category || null,
                sort: filter.sort || null,
            });
            setExpenses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [filter.category, filter.sort]);

    // Fetch categories for dropdown
    const fetchCategories = useCallback(async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, [fetchExpenses, fetchCategories]);

    // Add new expense
    const addExpense = async (expenseData) => {
        const idempotencyKey = generateIdempotencyKey();
        const newExpense = await createExpense({
            ...expenseData,
            idempotencyKey,
        });

        // Refresh the list after adding
        await fetchExpenses();
        await fetchCategories();

        return newExpense;
    };

    // Update filter
    const updateFilter = (newFilter) => {
        setFilter(prev => ({ ...prev, ...newFilter }));
    };

    // Calculate totals
    const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    const expenseCount = expenses.length;

    // Calculate category summary
    const categorySummary = expenses.reduce((acc, exp) => {
        const cat = exp.category;
        if (!acc[cat]) acc[cat] = 0;
        acc[cat] += parseFloat(exp.amount);
        return acc;
    }, {});

    return {
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
        refetch: fetchExpenses,
    };
}
