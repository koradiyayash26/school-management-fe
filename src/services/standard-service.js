import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getStandard = async () => {
  let response = await apiClient.get("/standards/standard-counter/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const deleteStandard = async (studentId) => {
  return await apiClient.delete(`/students/${studentId}/delete/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const fetchStandard = async (id) => {
  let response = await apiClient.get(`/standards/${id}/search/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export { getStandard, deleteStandard, fetchStandard };
