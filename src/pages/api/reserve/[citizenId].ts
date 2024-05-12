import type { APIRoute } from "astro";
import { Payment, Reserve, db, eq } from "astro:db";

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
  const payments = await db
    .select()
    .from(Payment)
    .where(eq(Payment.citizenId, citizenId));

  return new Response(JSON.stringify({ reserve: reserve[0], payments }));
};

export const PUT: APIRoute = async ({ request }) => {
  const data = await request.json();

  const result = await db
    .update(Reserve)
    .set({
      seatNumber: data.seatNumber,
      seatZone: data.seatZone,
    })
    .where(eq(Reserve.citizenId, data.citizenId));

  return new Response(JSON.stringify({ result }));
};
