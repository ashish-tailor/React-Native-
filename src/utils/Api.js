const BASE_URL = 'https://dummyjson.com';

export const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
 
  export const fetchAllProducts = async (limit = 20, skip = 0) => {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  

  export const fetchProductsByCategory = async (category,limit = 20, skip = 0) => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result
    } catch (error) {
      throw error;
    }
  };


  export const fetchProductsBySearchQuery = async (query, limit = 20, skip = 0) => {
    try {
      const response = await fetch(`${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
  