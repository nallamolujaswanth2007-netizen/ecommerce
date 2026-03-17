// SignUpModal.jsx (Module C upgraded)
// PURPOSE:
// - UI-only modal; uses shared validators (utils).
// CONCEPTS:
// - Controlled form + validation + error surface
// - Conditional rendering
// - Props contract

import { useState } from "react";
import { validateSignUp } from "../utils/validators";

export default function SignUpModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successText, setSuccessText] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccessText("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = validateSignUp(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSuccessText("✅ Sign-up successful");

    // Send data upward (unidirectional flow)
    onSuccess({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
  }

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modalHeader">
          <h3 className="modalTitle">Create Account</h3>
          <button className="iconBtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <label className="label">
            Full Name
            <input
              className={`input ${errors.name ? "inputError" : ""}`}
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <span className="errorText">{errors.name}</span>}
          </label>

          <label className="label">
            Email
            <input
              className={`input ${errors.email ? "inputError" : ""}`}
              name="email"
              value={form.email}
              onChange={handleChange}
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
            />
            {errors.password && <span className="errorText">{errors.password}</span>}
          </label>

          <label className="label">
            Confirm Password
            <input
              className={`input ${errors.confirmPassword ? "inputError" : ""}`}
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="errorText">{errors.confirmPassword}</span>
            )}
          </label>

          <button className="btnPrimary" type="submit">
            Sign Up
          </button>

          {successText && <div className="successBox">{successText}</div>}
        </form>

        <p className="hint">
          Frontend-only demo: user stored locally for learning purpose.
        </p>
      </div>
    </div>
  );
}
