import { internalServerError } from "@/utils/api-error";
import { getStoredCookie } from "@/utils/auth";
import { tryCatch } from "@/utils/try-catch";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { apiKey, redirect } = getStoredCookie(request);
  if (redirect) return redirect;
  const { data: response, error } = await tryCatch(
    fetch(process.env.API_BASE_URL
        + `/finance-manager/expenses`
        + `?page=${request.nextUrl.searchParams.get('page')}`
        + `&size=${request.nextUrl.searchParams.get('size')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application-json',
        'X-API-Key': apiKey,
      },
  }));
  if (error) return internalServerError(error);

  return Response.json(await response.json());
}
