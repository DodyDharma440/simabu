import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./common/utils/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(process.env["COOKIE_NAME"]!)?.value;
  const isVerified = await verifyToken(token || "");

  if (!token || !isVerified) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/user/:path*"],
};
