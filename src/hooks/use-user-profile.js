import { getUserProfileUsername } from "@/services/user-profile-service";
import { useQuery } from "@tanstack/react-query";

export const useUserProfileUsername = (token) => {
  return useQuery({
    queryKey: ["username", token],
    queryFn: () => getUserProfileUsername(token),
  });
};
