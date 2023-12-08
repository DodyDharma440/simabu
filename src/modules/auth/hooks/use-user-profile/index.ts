import { USER_LOGIN } from "@/auth/constants";
import { useQueryData } from "@/common/hooks";
import { IOfficer } from "@/user/interfaces";

export const useUserProfile = <T = IOfficer>() => {
  const { queryData: userProfileData } = useQueryData<T>([USER_LOGIN]);

  return { userData: userProfileData?.data.data };
};
