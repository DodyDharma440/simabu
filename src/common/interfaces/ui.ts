import { IconType } from "react-icons";
import { EditData } from "../hooks";

export interface ITabCardItem {
  label: string;
  id: string;
  pathnames?: string[];
}

export interface IBreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export type DateRangeValue = {
  label: string;
  value: [Date | null, Date | null];
};

export type SortType = "asc" | "desc" | "default";

export interface IFormModalProps<T extends any, I = string> {
  isOpen: boolean;
  onClose: () => void;
  editData: EditData<T, I>;
}

export interface ISidebarMenu {
  label: string;
  path: string;
  pathnames?: string[];
  count?: number;
  icon?: IconType;
}

export type ButtonActionType =
  | "add"
  | "edit"
  | "delete"
  | "detail"
  | "approval"
  | "print"
  | "download";
