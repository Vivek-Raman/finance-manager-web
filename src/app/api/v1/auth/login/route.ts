import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const MAX_AGE = 10000;

export async function POST(request: NextRequest) {
  const { apiKey } = await request.json();

  const loginResponse = await fetch(process.env.API_BASE_URL + '/finance-manager/user', {
    method: 'GET',
    headers: {
      'X-API-Key': apiKey,
    },
  }).then(r => r.json());
  if (!loginResponse.data) {
    return NextResponse.error();
  }

  const cookiesStore = await cookies();
  cookiesStore.set({
    name: 'token',
    value: apiKey,
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: true,
    maxAge: MAX_AGE,
  });
  cookiesStore.set({
    name: 'authenticated',
    value: 'true',
    httpOnly: false,
    sameSite: 'strict',
    path: '/',
    secure: true,
    maxAge: MAX_AGE,
  });

  return NextResponse.json(loginResponse);
}
