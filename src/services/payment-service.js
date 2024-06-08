import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

const getPaymentStudentNames = async () => {
  let response = await apiClient.get("/students/search/", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return response.data;
};

const getPaymentFeeList = async () => {
  let response = await apiClient.get("/payments/search/", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return response.data;
};

const getPaymentStudentFee = async (id, year) => {
  let response = await apiClient.get(`/payments/${id}/${year}/`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return response.data;
};

const getReceiptDetailsByid = async (id) => {
  let response = await apiClient.get(`/payments/${id}/receipt/details/`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
  return response.data;
};

const deletePaymentFee = async (paymentId) => {
  return await apiClient.delete(`/payments/${paymentId}/delete/`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

const patchPaymentFeeData = async (formattedData) => {
  console.log(formattedData);
  return await apiClient.patch("payments/payment-collect/", formattedData, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

export {
  getPaymentStudentNames,
  getPaymentFeeList,
  getReceiptDetailsByid,
  deletePaymentFee,
  getPaymentStudentFee,
  patchPaymentFeeData,
};
