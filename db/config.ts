import { column, defineDb, defineTable } from "astro:db";

// https://astro.build/db/config

const Reserves = defineTable({
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

export default defineDb({
  tables: { Reserves },
});
