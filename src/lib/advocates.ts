import "server-only";

import { type Advocate } from "@/db/schema";

export async function getAdvocates({
  query = "",
}: {
  query?: string;
}): Promise<Advocate[]> {
  // Artificial delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/advocates?q=${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch advocates");
  }

  const data = await response.json();

  return data.data;
}
