import { PaginationResponse } from "@/common/interfaces/api";
import { get, patch, post, remove } from "@/common/utils/react-query";
import { apiSimabu } from "@/common/configs/api";
import { OFFICERS_MASTER } from "../constants";
import { IOfficer, IOfficerInput } from "../interfaces";

export const useGetOfficers = get<PaginationResponse<IOfficer>>(
  (args, ctx) =>
    apiSimabu.get(`/user/petugas${args?.urlParams}`, { signal: ctx?.signal }),
  [OFFICERS_MASTER]
);

export const useCreateOfficer = post<IOfficer, IOfficerInput>(
  ({ formValues }) => apiSimabu.post("/user/petugas", formValues),
  [OFFICERS_MASTER],
  { successMessage: "Petugas baru berhasil dibuat" }
);

export const useUpdateOfficer = patch<IOfficer, IOfficerInput>(
  ({ formValues, id }) => apiSimabu.patch(`/user/petugas/${id}`, formValues),
  [OFFICERS_MASTER],
  { successMessage: "Petugas berhasil diperbarui" }
);

export const useDeleteOfficer = remove<IOfficer>(
  ({ id }) => apiSimabu.delete(`/user/petugas/${id}`),
  [OFFICERS_MASTER],
  { successMessage: "Petugas berhasil dihapus" }
);
