import React from 'react';

export function FilterControls({ filter, categories, onFilterChange }) {
    const handleCategoryChange = (e) => {
        onFilterChange({ category: e.target.value });
    };

    const handleSortToggle = () => {
        onFilterChange({
            sort: filter.sort === 'date_desc' ? null : 'date_desc',
        });
    };

    const handleClearFilters = () => {
        onFilterChange({ category: '', sort: 'date_desc' });
    };

    const hasFilters = filter.category || filter.sort !== 'date_desc';

    return (
        <div className="controls-bar">
            <div className="filter-group">
                <label htmlFor="category-filter">Filter:</label>
                <select
                    id="category-filter"
                    className="filter-select"
                    value={filter.category}
                    onChange={handleCategoryChange}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <button
                    className={`btn btn-secondary sort-button ${filter.sort === 'date_desc' ? 'active' : ''}`}
                    onClick={handleSortToggle}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12l7-7 7 7" />
                    </svg>
                    Newest First
                </button>

                {hasFilters && filter.category && (
                    <button className="btn btn-secondary" onClick={handleClearFilters}>
                        Clear Filters
                    </button>
                )}
            </div>
        </div>
    );
}
