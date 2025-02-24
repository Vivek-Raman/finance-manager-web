import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = request.cookies.get('token')?.value;
  if (!apiKey) return Response.error();
  const response = await fetch(process.env.API_BASE_URL
    + `/finance-manager/expenses`
    + `?page=${request.nextUrl.searchParams.get('page')}`
    + `&size=${request.nextUrl.searchParams.get('size')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application-json',
      'X-API-Key': apiKey,
    },
  });
  return Response.json(await response.json());
}
