import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const updatePassword = async (formData) => {
  return await apiClient.patch(`/api-auth/change-password/`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const updateUsernameEmail = async (formData) => {
  return await apiClient.patch(`/api-auth/change-username/`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getUserProfileUsername = async () => {
  let response = await apiClient.get(`/api-auth/user-profile-username/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export { updatePassword, updateUsernameEmail, getUserProfileUsername };
