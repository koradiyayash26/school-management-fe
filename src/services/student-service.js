import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getStudents = async () => {
  let response = await apiClient.get("/students/search/", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return response.data;
};

export { getStudents };
