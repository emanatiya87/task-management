import axios from "axios";
import { getAccessToken } from "@/constants/token";
import { BaseUrl, ApiKey } from "@/constants/apiConstants";
const apiClient = axios.create({
  baseURL: BaseUrl,
  headers: {
    apikey: ApiKey,
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (accessToken?.value) {
      config.headers.Authorization = `Bearer ${accessToken.value}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
