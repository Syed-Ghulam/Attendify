export const API_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    window.location.href = "/login";
  }

  return response;
};