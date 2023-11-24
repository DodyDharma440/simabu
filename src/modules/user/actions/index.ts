import { PaginationResponse } from "@/common/interfaces/api";
import { get, patch, post, remove } from "@/common/utils/react-query";
import { apiSimabu } from "@/common/configs/api";
import { OFFICERS_MASTER, STUDENTS_MASTER } from "../constants";
import {
  IOfficer,
  IOfficerInput,
  IStudent,
  IStudentInput,
} from "../interfaces";

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

export const useGetStudents = get<PaginationResponse<IStudent>>(
  (args, ctx) =>
    apiSimabu.get(`/user/mahasiswa${args?.urlParams}`, { signal: ctx?.signal }),
  [STUDENTS_MASTER]
);

export const useCreateStudent = post<IStudent, IStudentInput>(
  ({ formValues }) => apiSimabu.post("/user/mahasiswa", formValues),
  [STUDENTS_MASTER],
  { successMessage: "Mahasiswa baru berhasil dibuat" }
);

export const useUpdateStudent = patch<IStudent, IStudentInput>(
  ({ formValues, id }) => apiSimabu.patch(`/user/mahasiswa/${id}`, formValues),
  [STUDENTS_MASTER],
  { successMessage: "Mahasiswa berhasil diperbarui" }
);

export const useDeleteStudent = remove<IStudent>(
  ({ id }) => apiSimabu.delete(`/user/mahasiswa/${id}`),
  [STUDENTS_MASTER],
  { successMessage: "Mahasiswa berhasil dihapus" }
);
