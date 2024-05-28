import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getReportStandardData = async (id) => {
  try {
    const response = await apiClient.get(`/report/standard/${id}`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};

const getReportStandardCount = async () => {
  try {
    const response = await apiClient.get("standards/standard-counter", {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};

const getFeeReport = async () => {
  try {
    const response = await apiClient.get("/fee-report/", {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};

export { getReportStandardData, getReportStandardCount, getFeeReport };
