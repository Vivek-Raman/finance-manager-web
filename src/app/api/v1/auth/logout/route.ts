import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({
    'data': true,
  });

  response.headers.getSetCookie().push(`token=guest; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`);
  response.headers.getSetCookie().push(`authenticated=false; Secure; SameSite=Strict; Path=/; Max-Age=0`);
  return response;
}
