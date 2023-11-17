import { NextApiRequest, NextApiResponse } from "next";
import { PaginationResponse } from "../interfaces/api";

export const createResponse = <T extends Object>(
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
