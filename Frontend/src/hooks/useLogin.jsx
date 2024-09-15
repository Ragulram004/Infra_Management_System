import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const API = import.meta.env.VITE_INTRA_API_LOGIN;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error); 
      }

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json));

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: json });

        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError('Failed to connect to server.'); 
    }
  };

  return { login, isLoading, error };
};
