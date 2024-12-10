import { getSchoolType } from "@/hooks/use-school-type";
import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getStudents = async () => {
  let response = await apiClient.get("/students/search/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params: {
      school_type: getSchoolType(),
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

const bulkImport = async (formData) => {
  console.log(formData);
  return await apiClient.post(`/bulk-import/`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getStudentUpdateAcademicYearHistory = async (id) => {
  let response = await apiClient.get(`/students/${id}/academic-year-history/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export {
  getStudents,
  deleteStudent,
  getStudent,
  updateStudent,
  addStudent,
  bulkImport,
  getStudentUpdateAcademicYearHistory,
};
