import { count, ilike, or, sql, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

import db from "@/db";
import { advocates, advocateSpecialties, specialties } from "@/db/schema";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const filter = searchParams.get("filter") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "25");
  const offset = (page - 1) * limit;

  const baseQuery = db
    .select({
      id: advocates.id,
      firstName: advocates.firstName,
      lastName: advocates.lastName,
      city: advocates.city,
      degree: advocates.degree,
      yearsOfExperience: advocates.yearsOfExperience,
      phoneNumber: advocates.phoneNumber,
      createdAt: advocates.createdAt,
      specialties: sql`array_agg(${specialties.name})`,
    })
    .from(advocates)
    .leftJoin(
      advocateSpecialties,
      eq(advocateSpecialties.advocateId, advocates.id)
    )
    .leftJoin(specialties, eq(advocateSpecialties.specialtyId, specialties.id))
    .groupBy(
      advocates.id,
      advocates.firstName,
      advocates.lastName,
      advocates.city,
      advocates.degree,
      advocates.yearsOfExperience,
      advocates.phoneNumber,
      advocates.createdAt
    );

  const query = filter
    ? baseQuery.where(
        or(
          ilike(advocates.firstName, `%${filter}%`),
          ilike(advocates.lastName, `%${filter}%`),
          ilike(advocates.city, `%${filter}%`),
          ilike(advocates.degree, `%${filter}%`),
          ilike(specialties.name, `%${filter}%`)
        )
      )
    : baseQuery;

  const data = await query.limit(limit).offset(offset);
  const total = await db.select({ count: count() }).from(advocates);

  return Response.json({
    data,
    pagination: {
      page,
      limit,
      total: total[0].count,
    },
  });
}
