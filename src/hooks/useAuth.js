// useAuth.js
// PURPOSE:
// - Custom hook to manage authentication state and actions.
// CONCEPTS:
// - Hooks as lifecycle/state abstractions (CO3)
// - Controlled side effects (useEffect loads initial session)
// - Unidirectional data flow: hook returns actions used by UI

import { useEffect, useState } from "react";
import {
  getRegisteredUser,
  getSessionUser,
  login,
  logout,
  signUp,
} from "../services/authService";

export function useAuth() {
  const [registeredUser, setRegisteredUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On app start: load registered user + session (remember me)
  useEffect(() => {
    const reg = getRegisteredUser();
    setRegisteredUser(reg);

    const sessionUser = getSessionUser();
    if (sessionUser) {
      setIsLoggedIn(true);
      setCurrentUser(sessionUser);
    }
  }, []);

  function doSignUp(user) {
    const res = signUp(user);
    if (res.ok) setRegisteredUser(res.user);
    return res;
  }

  function doLogin({ email, password, remember }) {
    const res = login({ email, password, remember });
    if (res.ok) {
      setIsLoggedIn(true);
      setCurrentUser(res.user);
    }
    return res;
  }

  function doLogout() {
    logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
  }

  return {
    isLoggedIn,
    currentUser,
    registeredUser,
    signUp: doSignUp,
    login: doLogin,
    logout: doLogout,
  };
}
