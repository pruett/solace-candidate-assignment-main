import { relations, sql } from "drizzle-orm";
import {
  bigint,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const specialties = pgTable("specialties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const advocateSpecialties = pgTable(
  "advocate_specialties",
  {
    advocateId: integer("advocate_id")
      .references(() => advocates.id)
      .notNull(),
    specialtyId: integer("specialty_id")
      .references(() => specialties.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.advocateId, table.specialtyId] }),
  })
);

export type Advocate = typeof advocates.$inferSelect;
export type Specialty = typeof specialties.$inferSelect;
export type AdvocateSpecialty = typeof advocateSpecialties.$inferSelect;

// Type for the advocate query result that includes specialties
export type AdvocateWithSpecialties = Advocate & {
  specialties: string[];
};
