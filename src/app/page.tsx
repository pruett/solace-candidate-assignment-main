import { Suspense } from "react";
import { type SearchParams } from "nuqs/server";

import { searchParamsCache } from "@/lib/search-params";
import { getAdvocates } from "@/lib/advocates";

import { Advocates } from "./advocates.client";
import { Search } from "./search.client";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q: query } = searchParamsCache.parse(await searchParams);

  const dataPromise = getAdvocates({ query });

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />

      <Search />

      <Suspense fallback={<div>Loading advocates table...</div>}>
        <Advocates data={dataPromise} />
      </Suspense>
    </main>
  );
}
