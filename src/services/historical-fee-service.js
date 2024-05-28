import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getHistoricalFeeList = async () => {
  let response = await apiClient.get("/historical-fees/search/", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return response.data;
};

const deleteHistoricalFee = async (historicalFeeId) => {
  return await apiClient.delete(`/historical-fees/${historicalFeeId}/delete/`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

const addHistoricalFee = async (data) => {
  return await apiClient.post(`/historical-fees/add/`, data, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

export { getHistoricalFeeList, deleteHistoricalFee, addHistoricalFee };
