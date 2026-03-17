// AuthPage.jsx (Module C upgraded)
// PURPOSE:
// - UI-only Auth page; business logic handled by services/hooks.
// CONCEPTS:
// - Controlled forms + validation (CO3)
// - Error surfaces (CO2)
// - Props contract (CO3): onLogin/onSignUp callbacks

import { useState } from "react";
import SignUpModal from "../components/SignUpModal";
import { validateSignIn } from "../utils/validators";

export default function AuthPage({ registeredUser, onSignUp, onLogin }) {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  function handleChange(e) {
    const { name, type, checked, value } = e.target;

    // Immutability: update using a new object
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
    setInfoMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = validateSignIn(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Call parent handler (hook will call service)
    const res = onLogin({
      email: form.email.trim(),
      password: form.password,
      remember: form.remember,
    });

    if (!res.ok) setInfoMessage(res.message);
  }

  function handleSignUpSuccess(user) {
    // Save registered user (frontend-only)
    const res = onSignUp(user);
    if (res.ok) {
      setInfoMessage("✅ Sign-up successful! Now login with your email & password.");
      setForm((prev) => ({ ...prev, email: user.email, password: "" }));
      setIsSignUpOpen(false);
    }
  }

  return (
    <div className="authPage">
      <header className="brandHeader">
        <div className="brandLogo">🛒</div>
        <div>
          <h1 className="brandTitle">ShopEZ</h1>
          <p className="brandTag">Frontend-only Ecommerce Demo (React + Vite)</p>
        </div>
      </header>

      <div className="authGrid">
        <section className="card">
          <h2 className="cardTitle">Sign In</h2>

          <form onSubmit={handleSubmit} className="form">
            <label className="label">
              Email
              <input
                className={`input ${errors.email ? "inputError" : ""}`}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="demo@shop.com"
              />
              {errors.email && <span className="errorText">{errors.email}</span>}
            </label>

            <label className="label">
              Password
              <input
                className={`input ${errors.password ? "inputError" : ""}`}
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="demo123"
              />
              {errors.password && <span className="errorText">{errors.password}</span>}
            </label>

            <label className="label" style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              Remember Me (keeps login after refresh)
            </label>

            <label className="label" style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="checkbox" checked={showPass} onChange={() => setShowPass((p) => !p)} />
              Show Password
            </label>

            <button className="btnPrimary" type="submit">
              Login
            </button>

            <p className="hint">
              Demo: <b>demo@shop.com</b> / <b>demo123</b>
              {registeredUser ? " | Or use your signed-up account." : ""}
            </p>

            {infoMessage && <div className="infoBox">{infoMessage}</div>}
          </form>
        </section>

        <section className="card cardAlt">
          <h2 className="cardTitle">New here?</h2>
          <p className="text">Create an account to continue (no backend).</p>

          <button className="btnOutline" onClick={() => setIsSignUpOpen(true)}>
            Sign Up
          </button>

          <SignUpModal
            isOpen={isSignUpOpen}
            onClose={() => setIsSignUpOpen(false)}
            onSuccess={handleSignUpSuccess}
          />
        </section>
      </div>
    </div>
  );
}
