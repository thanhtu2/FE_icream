// src/components/CategoryFilter.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryFilter = ({ categories }) => {
  const navigate = useNavigate(); // Hook để điều hướng

  const handleCategoryChange = (e) => {
    const categoryID = e.target.value;
    navigate(`/products${categoryID ? `?category=${categoryID}` : ''}`); // Điều hướng với query parameters
  };

  return (
    <div className="category-filter">
      <h4>Danh mục sản phẩm</h4>
      <select onChange={handleCategoryChange}>
        <option value="">Tất cả</option>
        {categories.map(category => (
          <option key={category.CategoryID} value={category.CategoryID}>
            {category.Name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
