import { AxiosResponse } from "axios";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api";

export const useQueryData = <T, R = AxiosResponse<ApiResponse<T>>>(
  key: QueryKey
) => {
  const queryClient = useQueryClient();

  const queryData = queryClient.getQueryData<R>(key);
  const queryState = queryClient.getQueryState<R>(key);

  return { queryData, queryState };
};
