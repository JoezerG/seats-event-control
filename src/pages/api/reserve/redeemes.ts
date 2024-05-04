import type { APIRoute } from "astro";
import { db, eq, NOW, Reserve } from "astro:db";
import type { PaymentData } from "../../../stores/reserve";

const response = (msg: string, status: number, isError: boolean = false) =>
  new Response(JSON.stringify({ msg, isError }), { status });

export const POST: APIRoute = async ({ request }) => {
  const data = (await request.json()) as PaymentData;
  const { citizenId } = data;
  try {
    await db
      .update(Reserve)
      .set({ redeemed: true, redeemedAt: NOW })
      .where(eq(Reserve.citizenId, citizenId));
    return response("Entrega actualizada", 200);
  } catch (error) {
    console.error(error);
    return response("ERROR al amacenar pago", 500);
  }
};
