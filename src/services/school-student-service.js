import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getSchoolStudents = async () => {
  let response = await apiClient.get("/school-student/search/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const getSchoolStudentsNames = async () => {
  let response = await apiClient.get("/school-student/name/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const getSchoolStudentsIdData = async (id) => {
  let response = await apiClient.get(`/school-student/${id}/search/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const schoolStudentPost = async (formattedData) => {
  console.log(formattedData);
  return await apiClient.post(`/school-student/add/`, formattedData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const schoolStudentPatch = async (formattedData,id) => {
  return await apiClient.patch(`/school-student/${id}/edit/`, formattedData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export {
  getSchoolStudents,
  getSchoolStudentsNames,
  getSchoolStudentsIdData,
  schoolStudentPatch,
  schoolStudentPost,
};
