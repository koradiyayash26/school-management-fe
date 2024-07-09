import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getStudentHistoricalGetData = async () => {
  let response = await apiClient.get("/educationals/search/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const deleteStudentHistorical = async (id) => {
  return await apiClient.delete(`/educationals/${id}/delete/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export { getStudentHistoricalGetData, deleteStudentHistorical };
