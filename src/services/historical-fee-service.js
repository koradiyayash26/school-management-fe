import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getHistoricalFeeList = async () => {
  let response = await apiClient.get("/historical-fees/search/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const deleteHistoricalFee = async (historicalFeeId) => {
  return await apiClient.delete(`/historical-fees/${historicalFeeId}/delete/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const addHistoricalFee = async (data) => {
  return await apiClient.post(`/historical-fees/add/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export { getHistoricalFeeList, deleteHistoricalFee, addHistoricalFee };
