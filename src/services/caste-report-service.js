import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getCasteReportData = async () => {
  try {
    const response = await apiClient.get("/caste-report/", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching caste report list:", error);
    throw error;
  }
};

export { getCasteReportData };
