import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getUserList = async () => {
  let response = await apiClient.get("/api/users/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const postUser = async (data) => {
  return await apiClient.post(`/api/user/create/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getDataUser = async (id) => {
  let response = await apiClient.get(`/api/user/detail/${id}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const userDelete = async (id) => {
  return await apiClient.delete(`/api/user/delete/${id}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const changePasswordOfUser = async (data, id) => {
  return await apiClient.post(`/api/user/change-password/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getUserPermittionGroupData = async (id) => {
  let response = await apiClient.get(`/api/user/${id}/groups/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const patchUserPermittionGroupData = async (id, data) => {
  return await apiClient.post(`/api/user/${id}/assign-groups/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getUserPermitions = async (id) => {
  let response = await apiClient.get(`api/user/${id}/permissions/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const postUserPermitions = async (id, data) => {
  return await apiClient.post(`api/user/${id}/assign-permissions/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const studentUpdateBulk = async () => {
  return await apiClient.post(
    "student-update/bulk/",
    {}, // Assuming no data is being sent in the body
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};
export {
  getUserList,
  postUser,
  getDataUser,
  userDelete,
  changePasswordOfUser,
  getUserPermittionGroupData,
  patchUserPermittionGroupData,
  postUserPermitions,
  getUserPermitions,
  studentUpdateBulk,
};
