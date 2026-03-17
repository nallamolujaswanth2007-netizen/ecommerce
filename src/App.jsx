// App.jsx (Module C upgraded)
// PURPOSE:
// - Now uses custom hooks for auth/products/cart (engineering separation).
// CONCEPTS:
// - Hooks as abstractions (CO3)
// - Unidirectional data flow (App passes down props)
// - Conditional rendering (Auth vs Dashboard)

import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./hooks/useAuth";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";

export default function App() {
  const auth = useAuth();
  const { products, loading, errorText } = useProducts(auth.isLoggedIn);
  const cart = useCart(auth.isLoggedIn);

  return (
    <div className="appShell">
      {!auth.isLoggedIn ? (
        <AuthPage
          registeredUser={auth.registeredUser}
          onSignUp={auth.signUp}
          onLogin={auth.login}
        />
      ) : (
        <DashboardPage
          user={auth.currentUser}
          products={products}
          loading={loading}
          errorText={errorText}
          cartCount={cart.cartCount}
          onAddToCart={cart.addToCart}
          onResetCart={cart.resetCart}
          onLogout={auth.logout}
        />
      )}
    </div>
  );
}