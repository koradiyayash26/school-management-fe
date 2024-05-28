import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getFeeTypeData = async () => {
  let res = await apiClient.get(`/fee-types/search/`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return res.data;
};

const deleteFeeType = async (feeTypeId) => {
  return await apiClient.delete(`/fee-types/${feeTypeId}/delete/`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

const getFeeTypeIdDetails = async (id) => {
  console.log(id);
  let response = await apiClient.get(`/fee-types/${id}/search/`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return response.data;
};

const FeeTypeadd = async (formattedData) => {
  console.log(formattedData);
  let response = await apiClient.post(`/fee-types/add/`, formattedData, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return response.data;
};

const getFeeTypeAdd = async () => {
  let res = await apiClient.get(`/fee-types/add-search/`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return res.data;
};

const feeTypeUpdate = async (formattedData, id) => {
  console.log(id);
  return await apiClient.patch(`/fee-types/${id}/edit/`, formattedData, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

export {
  deleteFeeType,
  getFeeTypeData,
  getFeeTypeIdDetails,
  FeeTypeadd,
  getFeeTypeAdd,
  feeTypeUpdate,
};
