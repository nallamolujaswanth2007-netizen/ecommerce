// AuthPage.jsx
// MODULE A CONCEPTS:
// - Controlled form: input values come from React state
// - Validation: show error messages in UI (error surface)
// - Events: onChange, onSubmit, onClick
// - Composition: uses SignUpModal component

import { useState } from "react";
import SignUpModal from "../components/SignUpModal.jsx";

export default function AuthPage({ registeredUser, onSignUp, onLogin }) {
  // Controlled Sign-In form state
  const [form, setForm] = useState({ email: "", password: "" });

  // Error messages to show validation feedback
  const [errors, setErrors] = useState({});

  // Modal open/close state (conditional rendering)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // Small info message to show success or hints
  const [infoMessage, setInfoMessage] = useState("");

  // --- Event: input change ---
  function handleChange(e) {
    const { name, value } = e.target;

    // Immutability: create NEW object instead of mutating
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error as user types (UX improvement)
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // --- Validation logic (simple + student-friendly) ---
  function validateSignIn(values) {
    const nextErrors = {};

    if (!values.email.trim()) nextErrors.email = "Email is required";
    else if (!values.email.includes("@")) nextErrors.email = "Email must contain @";

    if (!values.password.trim()) nextErrors.password = "Password is required";
    else if (values.password.length < 6)
      nextErrors.password = "Password must be at least 6 characters";

    return nextErrors;
  }

  // --- Event: submit sign in ---
  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload (SPA behavior)

    const nextErrors = validateSignIn(form);
    setErrors(nextErrors);

    // If errors exist, stop login
    if (Object.keys(nextErrors).length > 0) return;

    // Frontend-only login rule:
    // 1) If user signed up, login must match that account.
    // 2) Else allow a demo account: demo@shop.com / demo123
    const demoEmail = "demo@shop.com";
    const demoPassword = "demo123";

    const canLoginWithRegistered =
      registeredUser &&
      form.email === registeredUser.email &&
      form.password === registeredUser.password;

    const canLoginWithDemo = form.email === demoEmail && form.password === demoPassword;

    if (!canLoginWithRegistered && !canLoginWithDemo) {
      setInfoMessage("Invalid credentials. Try demo@shop.com / demo123 or Sign Up first.");
      return;
    }

    // Successful login → call parent handler (unidirectional data flow)
    onLogin({ email: form.email });
  }

  function openSignUp() {
    setIsSignUpOpen(true);
    setInfoMessage("");
  }

  function closeSignUp() {
    setIsSignUpOpen(false);
  }

  function handleSignUpSuccess(user) {
    // Save registered user in App (parent)
    onSignUp(user);

    // Show success info
    setInfoMessage("✅ Sign-up successful! Now login using your email & password.");

    // Pre-fill sign-in email to help students observe data flow + UX
    setForm((prev) => ({ ...prev, email: user.email, password: "" }));

    setIsSignUpOpen(false);
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
            {/* Controlled Input: value comes from state, updates by onChange */}
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
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="demo123"
              />
              {errors.password && <span className="errorText">{errors.password}</span>}
            </label>

            <button className="btnPrimary" type="submit">
              Login
            </button>

            <p className="hint">
              Demo account: <b>demo@shop.com</b> / <b>demo123</b>
            </p>

            {infoMessage && <div className="infoBox">{infoMessage}</div>}
          </form>
        </section>

        <section className="card cardAlt">
          <h2 className="cardTitle">New here?</h2>
          <p className="text">
            Create an account to continue. (No backend — only React state validation demo.)
          </p>

          {/* Event: onClick opens modal */}
          <button className="btnOutline" onClick={openSignUp}>
            Sign Up
          </button>

          {/* Conditional rendering: modal appears only when isSignUpOpen is true */}
          <SignUpModal
            isOpen={isSignUpOpen}
            onClose={closeSignUp}
            onSuccess={handleSignUpSuccess}
          />
        </section>
      </div>
    </div>
  );
}
