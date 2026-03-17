// DashboardPage.jsx (Module C upgraded)
// PURPOSE:
// - Shows products fetched asynchronously via service/hook.
// CONCEPTS:
// - Loading + error surfaces for async data (CO2/CO4 thinking)
// - List + key rendering
// - Events update cart (reactive state)

import ProductCard from "../components/ProductCard";

export default function DashboardPage({
  user,
  products,
  loading,
  errorText,
  cartCount,
  onAddToCart,
  onResetCart,
  onLogout,
}) {
  return (
    <div className="dashPage">
      <header className="dashHeader">
        <div>
          <h2 className="dashTitle">Dashboard</h2>
          <p className="dashSub">
            Welcome <b>{user?.email}</b> 👋
          </p>
        </div>

        <div className="dashRight">
          <div className="cartPill">🧺 Cart: {cartCount}</div>
          <button className="btnOutline" onClick={onResetCart}>
            Reset Cart
          </button>
          <button className="btnOutline" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="card">
        <h3 className="cardTitle">Featured Products</h3>

        {/* Async UI surfaces */}
        {loading && <div className="infoBox">Loading products...</div>}
        {errorText && <div className="infoBox">❌ {errorText}</div>}

        {!loading && !errorText && (
          <div className="productGrid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
