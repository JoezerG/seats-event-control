import { column, defineDb, defineTable } from "astro:db";

// https://astro.build/db/config

const Reserve = defineTable({
  columns: {
    citizenId: column.text({ primaryKey: true }),
    fullName: column.text(),
    cellphone: column.text(),
    email: column.text(),
    birthday: column.text(),
    seatZone: column.text(),
    seatNumber: column.text(),
    reservedAt: column.date(),
  },
});

const Payment = defineTable({
  columns: {
    citizenId: column.text({ references: () => Reserve.columns.citizenId }),
    amount: column.number(),
    paidAt: column.date(),
    paymentType: column.text(),
    paymentMethod: column.text(),
  },
});

export default defineDb({
  tables: { Reserve, Payment },
});
