import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    // اگر لاگین نبود و خواست بره به /dashboard → بفرستش لاگین
    if (!token && pathname.startsWith("/account")) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // اگر لاگین بود و خواست بره به /login → بفرستش داشبورد
    if (token && pathname.startsWith("/auth/login")) {
        return NextResponse.redirect(new URL("/account", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/account/:path*", "/auth/login"],
};
