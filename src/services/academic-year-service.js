import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getAcademicYearList = async () => {
  let response = await apiClient.get("/academic-year/create-list/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const getAcademicYearData = async (id) => {
  try {
    const response = await apiClient.get(`/academic-year/update-delete/${id}/`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate data:", error);
    throw error;
  }
};

const postAcademicYear = async (data) => {
  return await apiClient.post(`/academic-year/create-list/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const updateAcademicYear = async (data, id) => {
  return await apiClient.patch(`/academic-year/update-delete/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export { getAcademicYearList, postAcademicYear,updateAcademicYear,getAcademicYearData };
