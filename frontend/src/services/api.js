// import axios from "axios";
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
// });
// api.interceptors.request.use((c) => {
//   const t = localStorage.getItem("token");
//   if (t) c.headers.Authorization = `Bearer ${t}`;
//   return c;
// });
// export default api;




import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;