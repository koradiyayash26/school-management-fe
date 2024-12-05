import { getStandardMasterList,getOneStandardMaster } from "@/services/standard-master-service";
import { useQuery } from "@tanstack/react-query";

export const useStandardMasterList = () => {
  return useQuery({
    queryKey: ["standrad-master"],
    queryFn: getStandardMasterList,
  });
};

export const useStandardMasterGet = (id) => {
  return useQuery({
    queryKey: ["standrad-master-get", id],
    queryFn: () => getOneStandardMaster(id),
    onError: (error) => {
      console.error("Error fetching standard master data:", error);
    },
  });
};
