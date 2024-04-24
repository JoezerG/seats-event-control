import type { APIRoute } from "astro";

export const POST: APIRoute = async ({}) => {
  return new Response("OK", { status: 200 });
};
