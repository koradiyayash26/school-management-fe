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


export {
  examTemplateGet,
};
