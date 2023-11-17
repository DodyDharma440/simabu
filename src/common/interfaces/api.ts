export interface ApiResponse<T extends any> {
  ok: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginationResponse<T extends any> {
  pageInfo: {
    hasNextPage: boolean;
    nextPage?: number;
  };
  nodes: T[];
  totalCount: number;
}

export type BasicData = {
  id: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  deleted_by?: string | null;
};
