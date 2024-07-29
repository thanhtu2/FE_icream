// src/pages/ProductPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../compoments/ProductList';
import CategoryFilter from '../compoments/CategoryFilter';

const ProductPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <CategoryFilter categories={categories} />
      <ProductList />
    </div>
  );
};

export default ProductPage;
