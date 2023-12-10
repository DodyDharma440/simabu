import { NextApiRequest, NextApiResponse } from "next";
import { PaginationResponse } from "../interfaces/api";

export const createResponse = <T extends any>(
  res: NextApiResponse,
  data: T,
  status: number = 200
) => {
  res.status(status).json({
    ok: true,
    statusCode: status,
    message: "Success",
    data,
  });
};

export const createErrResponse = (
  res: NextApiResponse,
  error: any,
  status: number = 500
) => {
  return res.status(status).json({
    ok: false,
    statusCode: status,
    message: "Error",
    error,
  });
};

export const paginationResponse = <T extends Object>(
  data: T[],
  count: number
): PaginationResponse<T> => {
  const hasNextPage = data.length < count;

  return {
    pageInfo: {
      hasNextPage,
    },
    nodes: data,
    totalCount: count,
  };
};

export const parsePaginationParams = (req: NextApiRequest) => {
  const { page, perPage } = req.query;

  if (page && perPage) {
    const props: { skip: number; take?: number } = {
      skip: (Number(page) - 1) * Number(perPage),
    };

    if (perPage) {
      props.take = Number(perPage);
    }
    return props;
  }

  return {};
};

export const parseSearchParams = (req: NextApiRequest, fields?: string[]) => {
  const searchValue = (req.query["search"] as string | undefined) || "";

  const searchQuery: any[] = [];

  const set = (obj: Record<any, any>, path: string[]) => {
    path.reduce((acc, key, i) => {
      if (acc[key] === undefined) acc[key] = {};
      if (i === path.length - 1) {
        acc[key] = {
          contains: searchValue,
          mode: "insensitive",
        };
      }
      return acc[key];
    }, obj);
  };

  fields?.forEach((field) => {
    const splitted = field.split(".");
    if (splitted.length > 1) {
      const obj: Record<string, any> = {};
      set(obj, splitted);
      searchQuery.push(obj);
    } else {
      searchQuery.push({ [field]: { contains: searchValue } });
    }
  });

  return {
    where: searchValue ? { OR: searchQuery } : {},
  };
};

type ParseParamsOptions = {
  search?: {
    fields?: string[];
  };
};

export const parseParams = (
  req: NextApiRequest,
  paramType: "pagination" | "search",
  options?: ParseParamsOptions
) => {
  switch (paramType) {
    case "pagination":
      return parsePaginationParams(req);
    case "search":
      return parseSearchParams(req, options?.search?.fields);
  }
};
