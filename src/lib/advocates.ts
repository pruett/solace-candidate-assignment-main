import "server-only";

import { type AdvocateWithSpecialties } from "@/db/schema";

export async function getAdvocates({
  filter = "",
}: {
  filter?: string;
}): Promise<AdvocateWithSpecialties[]> {
  // Artificial delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const url = `${process.env.API_URL}/advocates${
    filter ? `?filter=${filter}` : ""
  }`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch advocates");
  }

  const data = await response.json();

  return data.data;
}
