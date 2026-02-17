// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Utility to generate idempotency keys
export const generateIdempotencyKey = () => {
  return crypto.randomUUID ? crypto.randomUUID() : 
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
};

// Create a new expense
export const createExpense = async (expenseData) => {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to create expense' }));
    throw new Error(error.message || error.error || 'Failed to create expense');
  }

  return response.json();
};

// Get all expenses with optional filtering and sorting
export const getExpenses = async ({ category = null, sort = null } = {}) => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (sort) params.append('sort', sort);

  const queryString = params.toString();
  const url = `${API_BASE_URL}/expenses${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch expenses');
  }

  return response.json();
};

// Get all categories
export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/expenses/categories`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
};
