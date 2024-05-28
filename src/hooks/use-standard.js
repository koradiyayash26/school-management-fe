import { fetchStandard, getStandard } from "@/services/standard-service";
import { useQuery } from "@tanstack/react-query";

export const useStandard = () => {
  return useQuery({
    queryKey: ["standard"],
    queryFn: getStandard,
  });
};

export const useGetStandard = (id) => {
  return useQuery({
    queryKey: ["standardget", id],
    queryFn: () => fetchStandard(id),
  });
};
