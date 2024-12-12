import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const postRequestPermitions = async (data) => {
  return await apiClient.post(`/permission-request/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export { postRequestPermitions };
