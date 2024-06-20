import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getExam = async () => {
  let response = await apiClient.get("/students/search/", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return response.data;
};

const getIdExam = async (id) => {
  let response = await apiClient.get(`/exams/${id}/search/`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return response.data;
};

const addExam = async (data) => {
  return await apiClient.post(`/exams/add/`, data, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

const UploadFileExamAdd = async (uploaddata) => {
  return await apiClient.post(`/exams/uploadfile/add/`, uploaddata, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

const updateExam = async (data, id) => {
  console.log(data, id);
  return await apiClient.patch(`/exams/${id}/edit/`, data, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

const getExamMarksData = async () => {
  let response = await apiClient.get("/exams/search/", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return response.data;
};

const deleteExam = async (examId) => {
  return await apiClient.delete(`/exams/${examId}/delete/`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

export {
  addExam,
  getExam,
  getIdExam,
  updateExam,
  getExamMarksData,
  deleteExam,
  UploadFileExamAdd,
};
