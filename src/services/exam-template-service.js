import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const examTemplateGet = async () => {
  let response = await apiClient.get("/exam-template/search/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const examTemplateIdGet = async (id) => {
  let response = await apiClient.get(`/exam-template/${id}/search/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

const examTemplateIdUpdate = async (data, id) => {
  console.log(data, id);
  return await apiClient.patch(`/exam-template/${id}/edit/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const examTemplateIdAdd = async (data) => {
  return await apiClient.post(`/exam-template/add/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};


const examTemplateDelete = async (examId) => {
  return await apiClient.delete(`/exam-template/${examId}/delete/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export {
  examTemplateGet,
  examTemplateIdGet,
  examTemplateIdUpdate,
  examTemplateIdAdd,
  examTemplateDelete
};