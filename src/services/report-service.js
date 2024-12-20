import { getSchoolType } from "@/hooks/use-school-type";
import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getReportStandardData = async (id) => {
  try {
    const response = await apiClient.get(`/report/standard/${id}/`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};

const ExcelFileDownloadAll = async (id) => {
  try {
    const response = await apiClient.get(`/report/fee-report-excel/${id}/`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Can't Download Excel File", error);
    throw error;
  }
};

const getReportStandardCount = async () => {
  try {
    const response = await apiClient.get("/standards/standard-counter/", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }, params: {
        school_type: getSchoolType(),
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
        Authorization: `Bearer ${getToken()}`,
      },params: {
        school_type: getSchoolType(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};

export { getReportStandardData, getReportStandardCount, getFeeReport,ExcelFileDownloadAll };
