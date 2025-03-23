import { NextRequest } from "next/server"

export const getStoredCookie = (request: NextRequest) => {
  const cookie = request.cookies.get('token')?.value;
  if (!cookie) {
    return {
      apiKey: null,
      redirect: Response.redirect('/login'),
    }
  }

  return {
    apiKey: cookie!,
    redirect: null,
  }
}