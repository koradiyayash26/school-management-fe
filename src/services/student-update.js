import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getStudentUpdateTemplateData = async () => {
  let response = await apiClient.get("/student-update/search/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const addStudentUpdateTemplateData = async (data) => {
  return await apiClient.post("/student-update/add/", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getStudentUpdateStdYearData = async (standard, year) => {
  let response = await apiClient.get(
    `/student-update/students/${year}/${standard}/`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};

const updateStudentUpdatestdandYearSeleted = async (jsonData) => {
  return await apiClient.post("/student-update/seleted/", jsonData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const updateStudentUpdatestdandYearUnseleted = async (jsonData) => {
  return await apiClient.post("/student-update/unseleted/", jsonData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const addStudentsAddTogetDatastdyear = async (data) => {
  console.log(data);
  return await apiClient.post("/student-update/add-multilist/", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export {
  getStudentUpdateTemplateData,
  addStudentUpdateTemplateData,
  getStudentUpdateStdYearData,
  updateStudentUpdatestdandYearSeleted,
  updateStudentUpdatestdandYearUnseleted,
  addStudentsAddTogetDatastdyear,
};
