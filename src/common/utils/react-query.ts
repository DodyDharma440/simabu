import { AxiosError, AxiosResponse } from "axios";
import {
  QueryFunction,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import { UseFetchOptions, useFetch, ActionOptions, useAction } from "../hooks";
import { ApiResponse, BasicData } from "../interfaces/api";

type FindFn<P, R> = (
  args: P,
  ctx?: QueryFunctionContext<QueryKey>
) => ReturnType<QueryFunction<AxiosResponse<R>>>;

type MutationFn<P, R> = (args: P) => Promise<AxiosResponse<R>>;

type FindFnQueryKey<P> = QueryKey | ((args?: P) => QueryKey);

export type FindAll<D extends Object> = { urlParams?: string } & D;
export const get = <
  T = any,
  D extends Object = {},
  R = ApiResponse<T>,
  P = FindAll<D> | undefined
>(
  apiFn: FindFn<P, R>,
  queryKey: FindFnQueryKey<P>
) => {
  const useHookFn = (args?: P, options?: UseFetchOptions<T, R>) => {
    const key = queryKey instanceof Function ? queryKey(args) : queryKey;
    return useFetch<T, R>(
      [...key, ...(options?.uniqueKey || [])],
      (ctx) => apiFn(args || ({} as P), ctx),
      options
    );
  };

  return useHookFn;
};

export type FindById<I, D extends Object = {}> = { id: I } & D;
export const getById = <
  T,
  D extends Object = {},
  R extends ApiResponse<T> = ApiResponse<T>,
  I = string | number,
  P = FindById<I, D>
>(
  apiFn: FindFn<P, R>,
  queryKey: FindFnQueryKey<P>
) => {
  const useHookFn = (args: P, options?: UseFetchOptions<T, R>) => {
    const key = queryKey instanceof Function ? queryKey(args) : queryKey;
    return useFetch(
      [...key, ...(options?.uniqueKey || [])],
      (ctx) => apiFn(args, ctx),
      options
    );
  };

  return useHookFn;
};

const createMutationFunction = <T, P, R = ApiResponse<T>>(
  apiFn: MutationFn<P, R>,
  queryKey: QueryKey,
  defaultOptions?: Omit<ActionOptions<R>, "overrideKeys">
) => {
  const useHookFn = (options?: ActionOptions<R>, uniqueKey?: QueryKey) => {
    const _options = {
      ...(defaultOptions || {}),
      ...options,
    };

    const keys = options?.overrideKeys || queryKey;
    return useAction([...keys, ...(uniqueKey || [])], apiFn, _options);
  };
  return useHookFn;
};

export type PostData<T, D extends Object = {}> = { formValues: T } & D;
export const post = <T, F, D extends Object = {}, R = ApiResponse<T>>(
  apiFn: MutationFn<PostData<F, D>, R>,
  queryKey: QueryKey,
  defaultOptions?: ActionOptions<R>
) => {
  return createMutationFunction(apiFn, queryKey, defaultOptions);
};

export type UpdateData<T, I = number, D extends Object = {}> = {
  formValues: T;
  id: I;
} & D;
export const patch = <
  T,
  F,
  I = number,
  D extends Object = {},
  R = ApiResponse<T>
>(
  apiFn: MutationFn<UpdateData<F, I, D>, R>,
  queryKey: QueryKey,
  defaultOptions?: ActionOptions<R>
) => {
  return createMutationFunction(apiFn, queryKey, defaultOptions);
};

export type DeleteData<I = number, D extends Object = {}> = { id: I } & D;
export const remove = <
  T,
  I = number,
  D extends Object = {},
  R = ApiResponse<T>
>(
  apiFn: MutationFn<DeleteData<I, D>, R>,
  queryKey: QueryKey,
  defaultOptions?: ActionOptions<R>
) => {
  return createMutationFunction(apiFn, queryKey, defaultOptions);
};

export const getErrorMessage = (error: AxiosError<any>) => {
  if (error) {
    if (error?.response?.data) {
      const errRes = error?.response?.data?.error;

      if (errRes instanceof Object) {
        if (errRes?.name === "PrismaClientValidationError") {
          return "Error in Prisma";
        }
      }

      return error?.response?.data?.message || error?.response?.data?.error;
    } else if (error.message) {
      return error.message;
    } else {
      return "Terjadi kesalahan";
    }
  }
  return "";
};

export const createSignal = (timeoutMs?: number) => {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
};

export const divideBasicData = <T extends Object & BasicData>(data: T) => {
  const {
    id,
    createdAt,
    updatedAt,
    deletedAt,
    createdBy,
    updatedBy,
    deletedBy,
    ...rest
  } = data;

  return {
    basicData: {
      id,
      createdAt,
      updatedAt,
      deletedAt,
      createdBy,
      updatedBy,
      deletedBy,
    },
    divided: rest as Omit<T, keyof BasicData>,
  };
};
