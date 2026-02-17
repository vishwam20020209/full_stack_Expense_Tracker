package com.finomo.expense.service;

import com.finomo.expense.dto.ExpenseRequest;
import com.finomo.expense.dto.ExpenseResponse;
import com.finomo.expense.model.Expense;
import com.finomo.expense.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Transactional
    public ExpenseResponse createExpense(ExpenseRequest request) {
        // Check for duplicate using idempotency key
        Optional<Expense> existing = expenseRepository.findByIdempotencyKey(request.getIdempotencyKey());
        if (existing.isPresent()) {
            // Return existing expense (idempotent behavior)
            return mapToResponse(existing.get());
        }

        // Create new expense
        Expense expense = new Expense();
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        expense.setIdempotencyKey(request.getIdempotencyKey());

        Expense saved = expenseRepository.save(expense);
        return mapToResponse(saved);
    }

    public List<ExpenseResponse> getExpenses(String category, String sort) {
        List<Expense> expenses;

        // Apply category filter
        if (category != null && !category.isEmpty()) {
            expenses = expenseRepository.findByCategory(category);
        } else {
            expenses = expenseRepository.findAll();
        }

        // Apply sorting
        if (sort != null && !sort.isEmpty()) {
            switch (sort) {
                case "date_desc":
                    expenses.sort(Comparator.comparing(Expense::getDate).reversed());
                    break;
                case "date_asc":
                    expenses.sort(Comparator.comparing(Expense::getDate));
                    break;
                case "amount_desc":
                    expenses.sort(Comparator.comparing(Expense::getAmount).reversed());
                    break;
                case "amount_asc":
                    expenses.sort(Comparator.comparing(Expense::getAmount));
                    break;
                default:
                    expenses.sort(Comparator.comparing(Expense::getDate).reversed());
            }
        } else {
            // Default sort by date descending
            expenses.sort(Comparator.comparing(Expense::getDate).reversed());
        }

        return expenses.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<String> getCategories() {
        return expenseRepository.findDistinctCategories();
    }

    private ExpenseResponse mapToResponse(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getDescription(),
                expense.getDate(),
                expense.getCreatedAt()
        );
    }
}
