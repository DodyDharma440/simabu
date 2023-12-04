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
    pathnames: ["/admin/books/create", "/admin/books/edit/[id]"],
    icon: PiBooksFill,
  },
  {
    label: "User Management",
    path: "/admin/user-management",
    icon: HiUsers,
  },
  {
    label: "Logout",
    path: "/logout",
    icon: HiLogout,
  },
];
