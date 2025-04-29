import db from "@/db";
import { advocates, specialties, advocateSpecialties } from "@/db/schema";
import {
  advocates as advocatesData,
  specialties as specialtiesData,
} from "@/db/seed/data";

const randomSpecialty = () => {
  const random1 = Math.floor(Math.random() * 24);
  const random2 = Math.floor(Math.random() * (24 - random1)) + random1 + 1;
  return [random1, random2];
};

export async function POST() {
  // Clear all tables in the correct order (child tables first)
  await db.delete(advocateSpecialties);
  await db.delete(advocates);
  await db.delete(specialties);

  const specialtyRecords = await db
    .insert(specialties)
    .values(specialtiesData.map((name) => ({ name })))
    .returning();

  const advocateRecords = await db
    .insert(advocates)
    .values(advocatesData)
    .returning();

  const advocateSpecialtyRecords = [];
  for (const advocate of advocateRecords) {
    const [start, end] = randomSpecialty();
    const selectedSpecialties = specialtyRecords.slice(start, end);

    for (const specialty of selectedSpecialties) {
      advocateSpecialtyRecords.push({
        advocateId: advocate.id,
        specialtyId: specialty.id,
      });
    }
  }

  await db.insert(advocateSpecialties).values(advocateSpecialtyRecords);

  return Response.json({
    specialties: specialtyRecords,
    advocates: advocateRecords,
    advocateSpecialties: advocateSpecialtyRecords,
  });
}
