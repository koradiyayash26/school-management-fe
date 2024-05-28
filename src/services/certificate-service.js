import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getCertificateList = async () => {
  try {
    const response = await apiClient.get("/students/search/", {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate list:", error);
    throw error;
  }
};

const getCertificateData = async (id) => {
  try {
    const response = await apiClient.get(`/students/${id}/search/`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate data:", error);
    throw error;
  }
};

export { getCertificateList, getCertificateData };
