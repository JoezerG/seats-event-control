import { column, defineDb, defineTable } from "astro:db";

// https://astro.build/db/config

const Reserve = defineTable({
  columns: {
    citizenId: column.text({ primaryKey: true }),
    fullName: column.text(),
    cellphone: column.text(),
    tshirtSize: column.text({ default: "" }),
    seatZone: column.text(),
    seatNumber: column.text(),
    reservedAt: column.date(),
    redeemed: column.boolean({ default: false }),
    redeemedAt: column.date({ optional: true }),
    email: column.text({ deprecated: true, default: "" }),
    birthday: column.text({ deprecated: true, default: "" }),
  },
});

const Payment = defineTable({
  columns: {
    citizenId: column.text({ references: () => Reserve.columns.citizenId }),
    amount: column.number(),
    paymentType: column.text(),
    paymentMethod: column.text(),
    paidAt: column.date(),
  },
});

export default defineDb({
  tables: { Reserve, Payment },
});
