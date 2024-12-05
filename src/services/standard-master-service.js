import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getStandardMasterList = async () => {
  let response = await apiClient.get("/standards/standard-master/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const postStandardMaster = async (data) => {
  return await apiClient.post(`/standards/standard-master/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const updateStandardMaster = async (data, id) => {
  console.log(data, id);
  return await apiClient.patch(`/standards/standard-master/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getOneStandardMaster = async (id) => {
  let response = await apiClient.get(`/standards/standard-master/${id}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export { getStandardMasterList, postStandardMaster,updateStandardMaster,getOneStandardMaster };
