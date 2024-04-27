import { atom } from "nanostores";

export type ReserveData = {
  citizenId?: string;
  fullName?: string;
  cellphone?: string;
  email?: string;
  birthday?: string;
  seatZone?: string;
  seatNumber?: string;
  paymentType?: "total-payment" | "first-payment";
  paymentMethod?: "cash" | "transfer" | "digital";
};

export type PaymentData = {
  citizenId: string;
  amount: number;
  paidAt: Date;
};

export const currentReserve = atom<ReserveData>({});
export const enableSeats = atom(true);

// currentReserve.subscribe(({ birthday, citizenId, fullName }) => {});
