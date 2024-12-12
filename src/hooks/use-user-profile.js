import { getUserProfileUsername } from "@/services/user-profile-service";
import { useQuery } from "@tanstack/react-query";

export const useUserProfileUsername = () => {
  return useQuery({
    queryKey: ["username"],
    queryFn: () => getUserProfileUsername(),
  });
};
