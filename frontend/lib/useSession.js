import jwt from "jsonwebtoken";
import { getSessionToken } from "./cookie";
import { useState, useEffect } from "react";

export const useSessionH = () => {
  const token = getSessionToken();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = jwt.decode(token);
      setUser(decoded);
    }
  }, [token]);

  return user;
};
