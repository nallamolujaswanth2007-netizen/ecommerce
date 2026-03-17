// App.jsx
// MODULE A CONCEPTS covered here:
// 1) Component-driven thinking: App is the top component that composes pages.
// 2) Unidirectional data flow: App holds "source of truth" state and passes data/functions down via props.
// 3) Reactive state: UI automatically updates when state changes (no manual DOM updates).
// 4) Conditional rendering: Show AuthPage OR DashboardPage based on isLoggedIn.
// 5) Immutability (basic): We update state using new objects/values (not direct mutation).

import { useState } from "react";
import AuthPage from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import products from "./data/products.js";

export default function App() {
  // "isLoggedIn" controls which page is visible.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // In frontend-only demo: we store a "registeredUser" in state after signup.
  const [registeredUser, setRegisteredUser] = useState(null);

  // After login, we keep currentUser to show greeting on Dashboard.
  const [currentUser, setCurrentUser] = useState(null);

  // Simple cart count to show state + events on dashboard.
  const [cartCount, setCartCount] = useState(0);

  // ---- Event Handlers (Functions passed down as props) ----
  function handleSignUp(user) {
    // Immutability: we store a NEW object reference in state
    setRegisteredUser({ ...user });
  }

  function handleLogin(user) {
    setIsLoggedIn(true);
    setCurrentUser({ ...user });
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCartCount(0);
  }

  function handleAddToCart(product) {
    // Reactive state: changing cartCount automatically updates UI.
    setCartCount((prev) => prev + 1);
  }

  return (
    <div className="appShell">
      {/* Conditional Rendering: AuthPage if not logged in else Dashboard */}
      {!isLoggedIn ? (
        <AuthPage
          // Props: passing data + functions down (Unidirectional data flow)
          registeredUser={registeredUser}
          onSignUp={handleSignUp}
          onLogin={handleLogin}
        />
      ) : (
        <DashboardPage
          user={currentUser}
          cartCount={cartCount}
          products={products}
          onAddToCart={handleAddToCart}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
