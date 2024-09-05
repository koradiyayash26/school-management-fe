import { getUserList, getDataUser } from "@/services/settings-service";
import { useQuery } from "@tanstack/react-query";

export const useUserList = () => {
  return useQuery({
    queryKey: ["userlist"],
    queryFn: getUserList,
  });
};


export const useDataUser = (id) => {
  return useQuery({
    queryKey: ["datauser", id],
    queryFn: () => getDataUser(id),
  });
};
