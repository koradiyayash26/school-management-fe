import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const updatePassword = async (formData) => {
  return await apiClient.patch(`/api-auth/change-password/`, formData, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

const updateUsername = async (formData) => {
  return await apiClient.patch(`/api-auth/change-username/`, formData, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

const getUserProfileUsername = async (token) => {
  let response = await apiClient.get(
    `api-auth/user-profile-username/?token=${token}`,
    {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }
  );
  return response.data;
};

export { updatePassword, updateUsername, getUserProfileUsername };
