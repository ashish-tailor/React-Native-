import { getCache, setCache } from "./cache";

const BASE_URL = "https://dummyjson.com";

export const fetchCategories = async () => {
  const cacheKey = "categories";
  let categories = await getCache(cacheKey);

  if (!categories) {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    categories = await response.json();
    await setCache(cacheKey, categories);
  }

  return categories;
};

export const fetchAllProducts = async (limit = 20, skip = 0) => {
  const cacheKey = `allproducts_${limit}_${skip}`;
  let allproducts = await getCache(cacheKey);

  if (!allproducts) {
    const response = await fetch(
      `${BASE_URL}/products?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    allproducts = await response.json();
    await setCache(cacheKey, allproducts);
  }

  return allproducts;
};

export const fetchProductsByCategory = async (
  category,
  limit = 20,
  skip = 0
) => {
  const cacheKey = `productsByCategory_${category}_${limit}_${skip}`;
  let productsByCategory = await getCache(cacheKey);

  if (!productsByCategory) {
    const response = await fetch(
      `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    productsByCategory = await response.json();
    await setCache(cacheKey, productsByCategory);
  }

  return productsByCategory;
};

export const fetchProductsBySearchQuery = async (
  query,
  limit = 20,
  skip = 0
) => {
  const cacheKey = `productsBySearchQuery_${query}_${limit}_${skip}`;
  let productsBySearchQuery = await getCache(cacheKey);

  if (!productsBySearchQuery) {
    const response = await fetch(
      `${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    productsBySearchQuery = await response.json();
    await setCache(cacheKey, productsBySearchQuery);
  }

  return productsBySearchQuery;
};
