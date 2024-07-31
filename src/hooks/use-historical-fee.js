import { getHistoricalFeeList } from "@/services/historical-fee-service";
import { useQuery } from "@tanstack/react-query";

export const useGetListHistoricalFee = () => {
  return useQuery({
    queryKey: ["historicalfee"],
    queryFn: getHistoricalFeeList,
  });
};
