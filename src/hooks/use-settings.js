import { getUserList, getDataUser, getUserPermittionGroupData } from "@/services/settings-service";
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


export const useUserPermittionGroupData = (id) => {
  return useQuery({
    queryKey: ["userpermittiongroupdata", id],
    queryFn: () => getUserPermittionGroupData(id),
  });
};
