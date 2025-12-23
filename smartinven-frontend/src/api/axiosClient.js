import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Add access token to requests
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh token when expired
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const refresh = localStorage.getItem("refresh");

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh: refresh,
          }
        );

        localStorage.setItem("access", res.data.access);

        error.config.headers.Authorization = `Bearer ${res.data.access}`;
        return axiosClient(error.config);
      } catch (err) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
