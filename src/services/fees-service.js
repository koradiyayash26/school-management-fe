import { getSchoolType } from "@/hooks/use-school-type";
import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getFeeTypeData = async () => {
  let res = await apiClient.get(`/fee-types/search/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }, params: {
      school_type: getSchoolType(),
    },
  });
  return res.data;
};

const deleteFeeType = async (feeTypeId) => {
  return await apiClient.delete(`/fee-types/${feeTypeId}/delete/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getFeeTypeIdDetails = async (id) => {
  console.log(id);
  let response = await apiClient.get(`/fee-types/${id}/search/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const FeeTypeadd = async (formattedData) => {
  console.log(formattedData);
  let response = await apiClient.post(`/fee-types/add/`, formattedData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const getFeeTypeAdd = async () => {
  let res = await apiClient.get(`/fee-types/add-search/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

const feeTypeUpdate = async (formattedData, id) => {
  console.log(id);
  return await apiClient.patch(`/fee-types/${id}/edit/`, formattedData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getFeeStudentAssignUnAssignData = async (id, standard, year) => {
  let res = await apiClient.get(
    `/fee-types/${id}/${standard}/${year}/student-assign/`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return res.data;
};

const assignStudentUpdatePatch = async (assigned_students_data) => {
  try {
    const response = await apiClient.patch(
      "/update-student-fee-types/",
      assigned_students_data,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response.data; // Throw the error response data
  }
};

export {
  deleteFeeType,
  getFeeTypeData,
  getFeeTypeIdDetails,
  FeeTypeadd,
  getFeeTypeAdd,
  feeTypeUpdate,
  getFeeStudentAssignUnAssignData,
  assignStudentUpdatePatch,
};
