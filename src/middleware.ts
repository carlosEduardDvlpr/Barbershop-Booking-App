import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const currentTime = Math.floor(Date.now() / 1000);
  const decode = token && jwt.decode(token);

  if (!token && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (
    token &&
    decode instanceof Object &&
    decode.exp &&
    decode.exp < currentTime
  ) {
    (await cookies()).delete('token');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (
    token &&
    decode instanceof Object &&
    decode.exp &&
    decode.exp > currentTime &&
    req.nextUrl.pathname === '/'
  ) {
    return NextResponse.next();
  }

  if (
    token &&
    decode instanceof Object &&
    decode.exp &&
    decode.exp > currentTime &&
    req.nextUrl.pathname === '/login'
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (
    token &&
    decode instanceof Object &&
    decode.exp &&
    decode.exp > currentTime &&
    req.nextUrl.pathname === '/register'
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register'],
};
