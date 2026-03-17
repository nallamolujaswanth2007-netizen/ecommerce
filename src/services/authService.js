// authService.js
// PURPOSE:
// - Frontend-only "auth service" (no backend).
// - Stores a single registered user and session in localStorage.
// CONCEPTS:
// - Service layer (CO2/CO4 mindset): UI doesn't directly handle storage/business logic
// - Error handling: returns structured results
// - Unidirectional flow: UI calls service, service returns outcome

import { readJSON, writeJSON, removeKey } from "./storage";

const KEY_REGISTERED_USER = "shopez_registered_user";
const KEY_SESSION = "shopez_session";

// Demo credentials allowed even without signup
const DEMO_EMAIL = "demo@shop.com";
const DEMO_PASSWORD = "demo123";

export function getRegisteredUser() {
  return readJSON(KEY_REGISTERED_USER, null);
}

export function signUp({ name, email, password }) {
  // In real apps, backend validates uniqueness, hashing, etc.
  // Here we store it simply for demo.
  const user = { name, email, password };
  writeJSON(KEY_REGISTERED_USER, user);
  return { ok: true, user };
}

export function getSessionUser() {
  // Session exists only when "Remember Me" is used
  const session = readJSON(KEY_SESSION, null);
  if (!session?.email) return null;
  return { email: session.email };
}

export function logout() {
  removeKey(KEY_SESSION);
  return { ok: true };
}

export function login({ email, password, remember }) {
  const registered = getRegisteredUser();

  const canLoginWithRegistered =
    registered && registered.email === email && registered.password === password;

  const canLoginWithDemo = email === DEMO_EMAIL && password === DEMO_PASSWORD;

  if (!canLoginWithRegistered && !canLoginWithDemo) {
    return {
      ok: false,
      message: "Invalid credentials. Use demo@shop.com / demo123 or Sign Up first.",
    };
  }

  const user = { email };

  // Remember Me → store session in localStorage
  if (remember) {
    writeJSON(KEY_SESSION, { email });
  } else {
    // If not remembering, clear any old session
    removeKey(KEY_SESSION);
  }

  return { ok: true, user };
}
