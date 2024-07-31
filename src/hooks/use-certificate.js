import {
  getCertificateData,
  getCertificateList,
} from "@/services/certificate-service";
import { useQuery } from "@tanstack/react-query";

export const useCertificate = () => {
  return useQuery({
    queryKey: ["certificate"],
    queryFn: getCertificateList,
  });
};

export const useCertificateGetData = (id) => {
  return useQuery({
    queryKey: ["certificategetdata", id],
    queryFn: () => getCertificateData(id),
    onError: (error) => {
      console.error("Error fetching certificate data:", error);
    },
  });
};
