import { NextRequest, NextResponse } from "next/server";
import { decodeToken, verifyToken } from "./common/utils/auth";
import { IRole } from "@/auth/interfaces";
import { BasicData } from "./common/interfaces/api";
import { decodeJwt } from "jose";

const adminOnlyEndpoints = [
  "/user/petugas",
  "/user/mahasiswa",
  "/kategori-buku",
  "buku",
];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(process.env["COOKIE_NAME"]!)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }

  const isVerified = await verifyToken(token);
  if (!isVerified) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }

  const decodedToken = decodeJwt<{
    id: number;
    role: Omit<IRole, keyof BasicData>;
  }>(token);

  const role = decodedToken?.role.name;
  const checkRoleEndpoints = (targetRole: string, endpoints: string[]) => {
    return (
      role !== targetRole &&
      endpoints.some((e) => req.nextUrl.pathname.startsWith(`/api${e}`))
    );
  };

  if (checkRoleEndpoints("Admin", adminOnlyEndpoints)) {
    return NextResponse.redirect(new URL("/api/forbidden", req.url));
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/api/user/:path*", "/api/roles"],
};
