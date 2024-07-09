import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getStudents = async () => {
  let response = await apiClient.get("/students/search/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const deleteStudent = async (id) => {
  return await apiClient.delete(`/students/${id}/delete/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getStudent = async (id) => {
  let response = await apiClient.get(`/students/${id}/search/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const updateStudent = async (formattedData, id) => {
  console.log(id);
  return await apiClient.patch(`/students/${id}/edit/`, formattedData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const addStudent = async (formattedData) => {
  console.log(formattedData);
  return await apiClient.post(`/students/add/`, formattedData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export { getStudents, deleteStudent, getStudent, updateStudent, addStudent };
