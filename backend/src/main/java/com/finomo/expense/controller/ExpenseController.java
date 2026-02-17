package com.finomo.expense.controller;

import com.finomo.expense.dto.ExpenseRequest;
import com.finomo.expense.dto.ExpenseResponse;
import com.finomo.expense.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseResponse> createExpense(@Valid @RequestBody ExpenseRequest request) {
        ExpenseResponse response = expenseService.createExpense(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ExpenseResponse>> getExpenses(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sort) {
        List<ExpenseResponse> expenses = expenseService.getExpenses(category, sort);
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = expenseService.getCategories();
        return ResponseEntity.ok(categories);
    }
}
