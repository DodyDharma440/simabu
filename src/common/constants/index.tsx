import { MdLibraryBooks, MdSpaceDashboard } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { PiBooksFill } from "react-icons/pi";
import { HiUsers } from "react-icons/hi2";
import { ISidebarMenu } from "../interfaces/ui";

export const adminMenus: ISidebarMenu[] = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: MdSpaceDashboard,
  },
  {
    label: "Peminjaman",
    path: "/admin/borrowing",
    icon: MdLibraryBooks,
  },
  {
    label: "Pengembalian",
    path: "/admin/books-return",
    icon: SiBookstack,
  },
  {
    label: "Buku",
    path: "/admin/books",
    icon: PiBooksFill,
  },
  {
    label: "User Management",
    path: "/admin/user-management",
    icon: HiUsers,
  },
];
