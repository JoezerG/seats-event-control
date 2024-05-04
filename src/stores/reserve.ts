import { atom } from "nanostores";

export type ReserveData = {
  citizenId: string;
  fullName: string;
  cellphone: string;
  tshirtSize: string;
  seatZone: string;
  seatNumber: string;
  paymentType: "total-payment" | "first-payment" | "final-payment";
  paymentMethod: "cash" | "transfer" | "digital";
};

export type PaymentData = {
  citizenId: string;
  paymentType: "total-payment" | "first-payment" | "final-payment";
  paymentMethod: "cash" | "transfer" | "digital";
};

export const currentSeat = atom<Record<string, string>>({});
