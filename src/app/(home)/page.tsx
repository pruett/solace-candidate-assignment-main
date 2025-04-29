import {
  createSearchParamsCache,
  parseAsString,
  type SearchParams,
} from "nuqs/server";
import { Suspense } from "react";

import { getAdvocates } from "@/lib/advocates";

import { SearchQueryProvider } from "@/lib/search-query";
import { cn } from "@/lib/utils";
import { Advocates } from "./advocates";
import { AdvocatesSkeleton } from "./advocates-skeleton";
import { Search } from "./search";

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(""),
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q: query } = searchParamsCache.parse(await searchParams);

  const dataPromise = getAdvocates({ query });

  return (
    <main
      className={cn(
        "flex flex-col gap-8 justify-start min-h-screen",
        "bg-[linear-gradient(#fff,#3f937c0d_56%,#fff_95%),linear-gradient(178deg,#e9f0ee00_81%,#fff_94%)]",
        "bg-position-[0_0,0_0]",
        "bg-size-[auto,auto]"
      )}
    >
      <div className="p-4">
        <header className="w-full p-8 bg-linear-to-br from-[#285e50] to-[#3f937c] text-white shadow-xl rounded-2xl">
          <h1 className="text-xl font-light">Solace Advocates</h1>
        </header>
      </div>

      <div className="flex flex-col gap-8 w-full px-10 pb-10">
        <div className="max-w-lg flex flex-col gap-2">
          <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Don&rsquo;t navigate your health alone.
          </h2>
          <p className="text-xl text-muted-foreground">
            Find an advocate who will help untangle your healthcare by phone or
            video—no matter what you need—covered by Medicare.
          </p>
        </div>

        <SearchQueryProvider>
          <Search />

          <Suspense fallback={<AdvocatesSkeleton />}>
            <Advocates data={dataPromise} />
          </Suspense>
        </SearchQueryProvider>
      </div>
    </main>
  );
}
