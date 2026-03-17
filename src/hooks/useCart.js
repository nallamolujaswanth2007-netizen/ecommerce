// useCart.js
// PURPOSE:
// - Manage cart count with persistence using localStorage.
// CONCEPTS:
// - Reactive state (CO1/CO3)
// - Immutability (state update using prev)
// - Persistence (frontend-only engineering pattern)

import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "../services/storage";

const KEY_CART = "shopez_cart_count";

export function useCart(enabled) {
  const [cartCount, setCartCount] = useState(0);

  // On start: load from storage
  useEffect(() => {
    if (!enabled) return;
    const saved = readJSON(KEY_CART, 0);
    setCartCount(typeof saved === "number" ? saved : 0);
  }, [enabled]);

  // Whenever cartCount changes: persist it
  useEffect(() => {
    if (!enabled) return;
    writeJSON(KEY_CART, cartCount);
  }, [enabled, cartCount]);

  function addToCart() {
    setCartCount((prev) => prev + 1);
  }

  function resetCart() {
    setCartCount(0);
  }

  return { cartCount, addToCart, resetCart };
}
