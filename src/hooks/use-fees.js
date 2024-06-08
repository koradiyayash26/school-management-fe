import {
  getFeeStudentAssignUnAssignData,
  getFeeTypeAdd,
  getFeeTypeData,
  getFeeTypeIdDetails,
} from "@/services/fees-service";
import { useQuery } from "@tanstack/react-query";

export const useFeeType = () => {
  return useQuery({
    queryKey: ["feetypes"],
    queryFn: getFeeTypeData,
  });
};

export const useFeetypeGetdata = (id) => {
  console.log(id);
  return useQuery({
    queryKey: ["getfeetype", id],
    queryFn: () => getFeeTypeIdDetails(id),
  });
};

export const useFeeStudentAssignUnAssignData = (id, std, year) => {
  return useQuery({
    queryKey: ["getfeestudentassignunassingdata", id, std, year],
    queryFn: () => getFeeStudentAssignUnAssignData(id, std, year),
  });
};

export const useFeeTypeList = () => {
  return useQuery({
    queryKey: ["feetypesadd"],
    queryFn: getFeeTypeAdd,
  });
};
