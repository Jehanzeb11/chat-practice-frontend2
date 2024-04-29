import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.split("/")[1] !== "login" && !request.cookies.has("token")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (path.split("/")[1] === "login" && request.cookies.has("token")) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};