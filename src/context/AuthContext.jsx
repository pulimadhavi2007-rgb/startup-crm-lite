import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("crm-token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = localStorage.getItem("crm-token");
        if (!savedToken) {
          setIsLoading(false);
          return;
        }

        const data = await authService.getProfile();
        setUser(data.data || data.user || null);
        setToken(savedToken);
        localStorage.setItem("crm-user", JSON.stringify(data.data || data.user || null));
      } catch (error) {
        localStorage.removeItem("crm-token");
        localStorage.removeItem("crm-user");
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      const userData = data.data || data.user;
      const accessToken = userData?.token || data.token;

      if (accessToken) {
        localStorage.setItem("crm-token", accessToken);
        setToken(accessToken);
      }

      if (userData) {
        const safeUser = { ...userData };
        delete safeUser.token;
        setUser(safeUser);
        localStorage.setItem("crm-user", JSON.stringify(safeUser));
      }

      toast.success(data.message || "Login successful");
      navigate("/");
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.message ||
        "Login failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const data = await authService.register(name, email, password);
      const userData = data.data || data.user;
      const accessToken = userData?.token || data.token;

      if (accessToken) {
        localStorage.setItem("crm-token", accessToken);
        setToken(accessToken);
      }

      if (userData) {
        const safeUser = { ...userData };
        delete safeUser.token;
        setUser(safeUser);
        localStorage.setItem("crm-user", JSON.stringify(safeUser));
      }

      toast.success(data.message || "Registration successful");
      navigate("/");
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.message ||
        "Registration failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("crm-token");
      localStorage.removeItem("crm-user");
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };