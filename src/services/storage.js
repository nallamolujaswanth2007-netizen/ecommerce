// storage.js
// PURPOSE:
// - Small helper module to read/write JSON safely in localStorage.
// CONCEPTS:
// - Module pattern (CO2): reusable utility module
// - Separation of concerns: storage logic not mixed inside UI components

export function readJSON(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallbackValue;
    return JSON.parse(raw);
  } catch (err) {
    return fallbackValue;
  }
}

export function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeKey(key) {
  localStorage.removeItem(key);
}
