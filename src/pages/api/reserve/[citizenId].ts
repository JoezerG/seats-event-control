import type { APIRoute } from "astro";
import { Reserve, db, eq } from "astro:db";

export const GET: APIRoute = async ({ params }) => {
  const citizenId = params.citizenId;

  const reserve = await db
    .select()
    .from(Reserve)
    .where(eq(Reserve.citizenId, citizenId))
    .limit(1);

  if (reserve.length < 1) {
    return new Response("RESERVE NOT FOUNDED", { status: 404 });
  }

  return new Response(JSON.stringify(reserve[0]));
};
