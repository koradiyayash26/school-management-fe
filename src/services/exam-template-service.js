import { getSchoolType } from "@/hooks/use-school-type";
import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const examTemplateGet = async () => {
  let response = await apiClient.get("/exam-template/search/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }, params: {
      school_type: getSchoolType(),
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

const examTemplateGetStudents = async (id, std) => {
  let response = await apiClient.get(
    `/exam-template/exam-marks-assign/${std}/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};

const examTemplateStudentMarkAssingPost = async (id, std, formattedMarks) => {
  return await apiClient.post(
    `/exam-template/exam-marks-assign/${std}/${id}/`,
    formattedMarks,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

const examTemplateStudentGetForPatch = async (id, std) => {
  let response = await apiClient.get(
    `/exam-template/exam-marks-view/${std}/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};

const examAssingMarkUpdatePatch = async (updatedMark) => {
  return await apiClient.patch('/exam-template/update-mark/', updatedMark, {
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
  examTemplateDelete,
  examTemplateGetStudents,
  examTemplateStudentMarkAssingPost,
  examTemplateStudentGetForPatch,
  examAssingMarkUpdatePatch,
};
