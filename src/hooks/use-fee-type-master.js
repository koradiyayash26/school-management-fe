import { getFeeTypeMasterList,getOneFeeTypeMaster } from "@/services/fee-type-master";
import { useQuery } from "@tanstack/react-query";

export const useFeeTypeMasterList = () => {
  return useQuery({
    queryKey: ["fee-type-master"],
    queryFn: getFeeTypeMasterList,
  });
};

export const useFeeTypeMasterGet = (id) => {
  return useQuery({
    queryKey: ["fee-type-master-get", id],
    queryFn: () => getOneFeeTypeMaster(id),
    onError: (error) => {
      console.error("Error fetching fee type master data:", error);
    },
  });
};
