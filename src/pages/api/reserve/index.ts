import type { APIRoute } from "astro";
import { db, NOW, Payment, Reserve } from "astro:db";
import type { ReserveData } from "../../../stores/reserve";

const response = (msg: string, status: number, isError: boolean = false) =>
  new Response(JSON.stringify({ msg, isError }), { status });

export const POST: APIRoute = async ({ request }) => {
  const data = (await request.json()) as ReserveData;
  const {
    citizenId,
    fullName,
    tshirtSize,
    cellphone,
    email,
    seatNumber,
    seatZone,
    paymentMethod,
    paymentType,
  } = data;

  try {
    await db.insert(Reserve).values({
      citizenId,
      fullName,
      tshirtSize,
      cellphone,
      email,
      seatNumber,
      seatZone,
      reservedAt: NOW,
    });

    const _payment = {
      citizenId,
      paidAt: NOW,
      paymentMethod,
      paymentType,
      amount: paymentType === "total-payment" ? 90000 : 45000,
    };
    await db.insert(Payment).values(_payment);
  } catch (error) {
    console.error(error);
    if (error.code === "SQLITE_CONSTRAINT_PRIMARYKEY") {
      return response("Ya existe una reserva con este Documento", 401, true);
    }

    return response("ERROR Al amacenar la reserva", 500, true);
  }

  return response("Reserva almacenada", 200);
};

export const GET: APIRoute = async () => {
  const reserves = await db.select().from(Reserve);
  return new Response(JSON.stringify(reserves), { status: 200 });
};
