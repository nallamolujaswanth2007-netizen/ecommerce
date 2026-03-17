// validators.js
// PURPOSE:
// - Central place for validation logic.
// CONCEPTS:
// - Pure functions + immutability (CO2): functions return new error objects, do not mutate input
// - Reusability: same validators used by multiple components

export function isValidEmail(email) {
  return typeof email === "string" && email.includes("@");
}

export function validateSignIn(values) {
  const errors = {};

  if (!values.email?.trim()) errors.email = "Email is required";
  else if (!isValidEmail(values.email)) errors.email = "Email must contain @";

  if (!values.password?.trim()) errors.password = "Password is required";
  else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";

  return errors;
}

export function validateSignUp(values) {
  const errors = {};

  if (!values.name?.trim()) errors.name = "Name is required";
  else if (values.name.trim().length < 3) errors.name = "Name must be at least 3 characters";

  if (!values.email?.trim()) errors.email = "Email is required";
  else if (!isValidEmail(values.email)) errors.email = "Invalid email format";

  if (!values.password?.trim()) errors.password = "Password is required";
  else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";

  if (!values.confirmPassword?.trim()) errors.confirmPassword = "Please confirm your password";
  else if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords do not match";

  return errors;
}
