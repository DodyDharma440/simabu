import { useCallback } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { useDidUpdate } from "@mantine/hooks";
import {
  QueryKey,
  useQueryClient,
  UseQueryOptions,
  useQuery,
  QueryFunction,
} from "@tanstack/react-query";
import { ApiResponse } from "../../interfaces/api";

export type UseFetchOptions<T, R = ApiResponse<T>> = {
  cancellation?: any[];
  uniqueKey?: QueryKey;
} & UseQueryOptions<
  AxiosResponse<R>,
  AxiosError<any>,
  AxiosResponse<R>,
  QueryKey
>;

export const useFetch = <T, R = ApiResponse<T>>(
  queryKey: QueryKey,
  apiFn: QueryFunction<AxiosResponse<R>, QueryKey>,
  options?: UseFetchOptions<T, R>
) => {
  const queryClient = useQueryClient();
  const cancel = useCallback(() => {
    queryClient.cancelQueries({ queryKey: [queryKey] });
  }, [queryClient, queryKey]);

  useDidUpdate(() => {
    if (options?.cancellation) {
      cancel();
    }
  }, [...(options?.cancellation || []), queryClient, queryKey]);

  const query = useQuery<
    AxiosResponse<R>,
    AxiosError<any>,
    AxiosResponse<R>,
    QueryKey
  >({
    queryFn: apiFn,
    queryKey,
    ...options,
  });

  return {
    ...query,
    cancel,
  } as typeof query & { cancel: typeof cancel };
};
