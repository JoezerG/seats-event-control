import type { APIRoute } from "astro";
import { db, NOW, Payment } from "astro:db";
import type { PaymentData } from "../../../stores/reserve";

const response = (msg: string, status: number, isError: boolean = false) =>
  new Response(JSON.stringify({ msg, isError }), { status });

export const POST: APIRoute = async ({ request }) => {
  const data = (await request.json()) as PaymentData;
  const { citizenId, paymentMethod, paymentType } = data;
  try {
    const _payment = {
      citizenId,
      paidAt: NOW,
      paymentMethod,
      paymentType,
      amount: paymentType === "total-payment" ? 90000 : 45000,
    };
    await db.insert(Payment).values(_payment);
    return response("Pago almacenado", 200);
  } catch (error) {
    console.error(error);
    return response("ERROR al amacenar pago", 500);
  }
};
