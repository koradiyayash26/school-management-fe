import {
  getPaymentFeeList,
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

export const usePaymentFeeList = () => {
  return useQuery({
    queryKey: ["paymentfeelist"],
    queryFn: getPaymentFeeList,
  });
};
