import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getFeeTypeMasterList = async () => {
  let response = await apiClient.get("/fee-type-master/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const postFeeTypeMaster = async (data) => {
  return await apiClient.post(`/fee-type-master/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const updateFeeTypeMaster = async (data, id) => {
  console.log(data, id);
  return await apiClient.patch(`/fee-type-master/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getOneFeeTypeMaster = async (id) => {
  let response = await apiClient.get(`/fee-type-master/${id}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export { getFeeTypeMasterList, postFeeTypeMaster,updateFeeTypeMaster,getOneFeeTypeMaster };
