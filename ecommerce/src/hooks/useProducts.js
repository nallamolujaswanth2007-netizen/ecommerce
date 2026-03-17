// useProducts.js
// PURPOSE:
// - Fetch products with loading + error state.
// CONCEPTS:
// - Side-effects controlled by useEffect (CO3)
// - Async flow (CO2/CO4): loading/error UI patterns

import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";

export function useProducts(enabled) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (!enabled) return;

    let alive = true; // prevents setting state after unmount (basic safety)

    async function load() {
      try {
        setLoading(true);
        setErrorText("");
        const data = await fetchProducts();
        if (alive) setProducts(data);
      } catch (err) {
        if (alive) setErrorText(err.message || "Failed to load products");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [enabled]);

  return { products, loading, errorText };
}
