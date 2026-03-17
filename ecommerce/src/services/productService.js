// productService.js
// PURPOSE:
// - Product data retrieval using an async function.
// - For demo: reads from local mock data but simulates network delay.
// CONCEPTS:
// - Async/await + promise chain thinking (CO2)
// - Service layer abstraction (CO4 style)

import products from "../data/products";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchProducts() {
  // Simulate network delay to teach loading UI
  await delay(600);

  // Simulate: return data
  return products;

  // (Optional teaching) simulate error:
  // throw new Error("Network error while fetching products");
}