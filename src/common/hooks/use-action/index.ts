import { AxiosError, AxiosResponse } from "axios";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationProps, notifications } from "@mantine/notifications";
import { ApiResponse } from "../../interfaces/api";

const AUTO_CLOSE = 5000;

export type ActionOptions<R> = {
  onSuccess?: (res: AxiosResponse<R>) => void;
  onError?: (res: AxiosError<any> | Error) => void;
  successMessage?: ((res: AxiosResponse<R>) => string) | string;
  errorMessage?: ((res: AxiosError<any> | Error) => string) | string;
  hideError?: boolean;
  successNotifProps?: NotificationProps;
  errorNotifProps?: NotificationProps;
  overrideKeys?: QueryKey;
};

export const useAction = <T = any, P = any, R = ApiResponse<T>>(
  queryKey: QueryKey,
  apiFn: (args: P) => Promise<AxiosResponse<R>>,
  options?: ActionOptions<R>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiFn,
    onSuccess: (res) => {
      if (options?.successMessage) {
        const { successMessage } = options;
        const message =
          successMessage instanceof Function
            ? successMessage(res)
            : successMessage;

        const notifProps: NotificationProps = {
          message,
          color: "green",
          title: "Success",
          autoClose: AUTO_CLOSE,
          ...(options?.successNotifProps || {}),
        };
        notifications.show(notifProps);
      }

      options?.onSuccess?.(res);
    },
    onError: (error: AxiosError | Error) => {
      if (!options?.hideError) {
        if (options?.errorMessage) {
          const { errorMessage } = options;
          const message =
            errorMessage instanceof Function
              ? errorMessage(error)
              : errorMessage;
          notifications.show({
            message,
            color: "red",
            autoClose: AUTO_CLOSE,
            title: "Error",
            ...(options?.errorNotifProps || {}),
          });
        }

        const axiosError = error as AxiosError<any>;

        const errRes = axiosError.response?.data?.error;
        let message = errRes || error.message || "Terjadi kesalahan";
        if (errRes instanceof Object) {
          message = errRes?.name || "Prisma Client Error";
        }

        notifications.show({
          message,
          color: "red",
          autoClose: AUTO_CLOSE,
          title: "Error",
          ...(options?.errorNotifProps || {}),
        });
      }
      options?.onError?.(error);
    },
    onSettled: () => {
      queryKey.forEach((key) => {
        queryClient.refetchQueries({ queryKey: [key] });
      });
    },
  });
};
