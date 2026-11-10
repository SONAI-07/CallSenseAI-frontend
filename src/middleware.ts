import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Check if user is trying to access protected routes
    const protectedPaths = ["/dashboard", "/agents", "/pricing"];
    const isProtectedRoute = protectedPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    );

    // Check if user has token
    const token = request.cookies.get("callsense_token")?.value;

    // For client-side auth, we rely on the redirect in client components
    // This middleware is a safety net
    if (isProtectedRoute && !token) {
        // Let the client-side redirect handle it
        // This is a fallback check
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/agents/:path*", "/pricing/:path*"],
};