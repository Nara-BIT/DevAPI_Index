import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  getMe: () => API.get("/auth/me"),
};

export const apisAPI = {
  getAll: (params) => API.get("/apis", { params }),
  getById: (id) => API.get(`/apis/${id}`),
  submit: (data) => API.post("/apis/submit", data),
};

export const reviewsAPI = {
  getByApi: (apiId) => API.get(`/reviews/${apiId}`),
  create: (apiId, data) => API.post(`/reviews/${apiId}`, data),
  delete: (id) => API.delete(`/reviews/${id}`),
};

export const bookmarksAPI = {
  getAll: () => API.get("/bookmarks"),
  toggle: (apiId) => API.post(`/bookmarks/${apiId}`),
};

export const adminAPI = {
  getStats: () => API.get("/admin/stats"),
  getPending: () => API.get("/admin/apis/pending"),
  approve: (id) => API.put(`/admin/apis/${id}/approve`),
  reject: (id) => API.put(`/admin/apis/${id}/reject`),
  createCategory: (data) => API.post("/admin/categories", data),
  deleteCategory: (id) => API.delete(`/admin/categories/${id}`),
};

export default API;
