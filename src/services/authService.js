import api from "./api";

export const register = async (name, email, password) => {
  const response = await api.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post("/api/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("crm-token");
  localStorage.removeItem("crm-user");
};

export const getProfile = async () => {
  const response = await api.get("/api/auth/profile");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/api/auth/profile", data);
  return response.data;
};