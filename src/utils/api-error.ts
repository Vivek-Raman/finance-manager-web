export const internalServerError = (err: Error) => {
  const errorResponse = new Response(JSON.stringify({
    data: null,
    error: err.message,
  }), {
    status: 500,
  });
  return errorResponse;
}
