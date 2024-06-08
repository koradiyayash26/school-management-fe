import {
  getPaymentFeeList,
  getPaymentStudentFee,
  getPaymentStudentNames,
  getReceiptDetailsByid,
} from "@/services/payment-service";
import { useQuery } from "@tanstack/react-query";

export const usePayment = () => {
  return useQuery({
    queryKey: ["payment"],
    queryFn: getPaymentStudentNames,
  });
};

export const usePaymentReceiptDetailsBytid = (id) => {
  return useQuery({
    queryKey: ["receiptdetails", id],
    queryFn: () => getReceiptDetailsByid(id),
  });
};

export const usePaymentStudentFee = (id, year) => {
  return useQuery({
    queryKey: ["paymentstudentfee", id, year],
    queryFn: () => getPaymentStudentFee(id, year),
  });
};

export const usePaymentFeeList = () => {
  return useQuery({
    queryKey: ["paymentfeelist"],
    queryFn: getPaymentFeeList,
  });
};
