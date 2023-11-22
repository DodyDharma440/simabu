import { NextRequest, NextResponse } from "next/server";
import { decodeToken, verifyToken } from "./common/utils/auth";
import { IRole } from "@/auth/interfaces";
import { BasicData } from "./common/interfaces/api";
import { decodeJwt } from "jose";

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

  if (
    role !== "Admin" &&
    req.nextUrl.pathname.startsWith("/api/user/petugas")
  ) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/api/user/:path*", "/api/roles"],
};
