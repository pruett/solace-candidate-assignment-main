import { NextRequest } from "next/server";

import db from "@/db";
import { advocates } from "@/db/schema";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";

  const data = await db.select().from(advocates);

  if (query) {
    const filteredResults = data.filter((advocate) => {
      return (
        advocate.firstName.includes(query) ||
        advocate.lastName.includes(query) ||
        advocate.city.includes(query) ||
        advocate.degree.includes(query) ||
        (advocate.specialties as string[]).includes(query) ||
        advocate.yearsOfExperience.toString().includes(query)
      );
    });

    return Response.json({ data: filteredResults });
  }

  return Response.json({ data });
}
