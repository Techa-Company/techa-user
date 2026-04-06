import { NextResponse } from "next/server";

export function middleware(request) {
    // امنیت اضافی در برابر bypass vulnerability
    // if (request.headers.has("x-middleware-subrequest")) {
    //     return NextResponse.next();
    // }

    // const token = request.cookies.get("token")?.value;
    // const { pathname } = request.nextUrl;

    // const isAuthRoute = pathname.startsWith("/auth/");
    // const isProtected = pathname.startsWith("/account");

    // if (!token && isProtected) {
    //     const loginUrl = new URL("/auth/login", request.url);
    //     loginUrl.searchParams.set("redirect", pathname);
    //     return NextResponse.redirect(loginUrl);
    // }

    // if (token && isAuthRoute) {
    //     let redirectTo = request.nextUrl.searchParams.get("redirect") || "/account/profile";
    //     if (!redirectTo.startsWith("/")) redirectTo = "/account/profile";

    //     return NextResponse.redirect(new URL(redirectTo, request.url));
    // }

    // return NextResponse.next();
}

export const config = {
    matcher: [
        "/account/:path*",
        "/account",
        "/auth/:path*",
    ],
};