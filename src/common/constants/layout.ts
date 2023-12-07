import { MdLibraryBooks, MdSpaceDashboard } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { PiBooksFill } from "react-icons/pi";
import { HiUsers } from "react-icons/hi2";
import { ISidebarMenu } from "../interfaces/ui";
import { HiLogout } from "react-icons/hi";

export const adminMenus: ISidebarMenu[] = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: MdSpaceDashboard,
    roles: ["Admin", "Petugas"],
  },
  {
    label: "Peminjaman",
    path: "/admin/borrowing",
    icon: MdLibraryBooks,
    roles: ["Admin", "Petugas"],
  },
  {
    label: "Pengembalian",
    path: "/admin/books-return",
    icon: SiBookstack,
    roles: ["Admin", "Petugas"],
  },
  {
    label: "Buku",
    path: "/admin/books",
    pathnames: ["/admin/books/create", "/admin/books/edit/[id]"],
    icon: PiBooksFill,
    roles: ["Admin"],
  },
  {
    label: "User Management",
    path: "/admin/user-management",
    icon: HiUsers,
    roles: ["Admin"],
  },
  {
    label: "Logout",
    path: "/logout",
    icon: HiLogout,
    roles: ["Admin", "Petugas"],
  },
];
