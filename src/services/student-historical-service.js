import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getStudentHistoricalGetData = async () => {
  let response = await apiClient.get("/educationals/search/", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return response.data;
};

const deleteStudentHistorical = async (id) => {
  return await apiClient.delete(`/educationals/${id}/delete/`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

export { getStudentHistoricalGetData, deleteStudentHistorical };
