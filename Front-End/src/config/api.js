export const API_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (url, options = {}) => {


  const response = await fetch(`${API_URL}${url}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  if (response.status === 401) {
   
    const refreshResponse = await fetch(
      `${API_URL}/users/refresh-token`,
      {
        method: "POST",
        credentials: "include"
      }
    );

    if(refreshResponse.ok){
      return fetch(`${API_URL}${url}`,{
        credentials: "include",
        ...options,
        headers:{
          "Content-Type" : "application/json",
          ...options.headers
        }
      });
    }

    localStorage.removeItem("userId");
    window.location.href = "/login";
  }

  return response;
};