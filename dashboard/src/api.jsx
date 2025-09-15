import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.comfortyzone.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApi = async (endpoint, query) => {
  try {
    const response = await apiClient.get(endpoint, { params: query });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const postApi = async (endpoint, data) => {
  try {
    const config = {};
    if (data instanceof FormData) {
      // When sending FormData, we must override the default Content-Type
      // to allow the browser to set it automatically with the correct boundary.
      config.headers = {
        'Content-Type': 'multipart/form-data',
      };
    }
    const response = await apiClient.post(endpoint, data, config);
    return response.data || {};
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const putApi = async (endpoint, data) => {
  try {
    const config = {};
    if (data instanceof FormData) {
      config.headers = {
        'Content-Type': 'multipart/form-data',
      };
    }
    const response = await apiClient.put(endpoint, data, config);
    return response.data || {};
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const deleteApi = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data || {};
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
