import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const token = request.cookies.get('refresh_token')
    if(!token){
        return NextResponse.redirect(new URL('/home', request.url))
    }
}
 
export const config = {
  matcher: '/user/:path*',
}