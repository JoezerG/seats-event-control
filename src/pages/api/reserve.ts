import type { APIRoute } from "astro";
import { db, NOW, Reserve } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  console.log(data);

  return new Response("OK", { status: 200 });
};
