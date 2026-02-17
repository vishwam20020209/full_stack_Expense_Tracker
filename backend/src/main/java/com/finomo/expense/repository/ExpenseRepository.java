package com.finomo.expense.repository;

import com.finomo.expense.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, UUID> {

    // Find by idempotency key for duplicate detection
    Optional<Expense> findByIdempotencyKey(String idempotencyKey);

    // Find all expenses ordered by date descending
    List<Expense> findAllByOrderByDateDesc();

    // Find by category ordered by date descending
    List<Expense> findByCategoryOrderByDateDesc(String category);

    // Find by category (any order)
    List<Expense> findByCategory(String category);

    // Get distinct categories for filter dropdown
    @Query("SELECT DISTINCT e.category FROM Expense e ORDER BY e.category")
    List<String> findDistinctCategories();
}
