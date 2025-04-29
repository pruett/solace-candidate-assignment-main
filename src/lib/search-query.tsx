"use client";

import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { createContext, useContext, useTransition } from "react";
import { useQueryState } from "nuqs";

type SearchQueryContextType = {
  query: string;
  setQuery: (value: string | null) => void;
  isPending: boolean;
};

const SearchQueryContext = createContext<SearchQueryContextType | undefined>(
  undefined
);

export function useSearchQuery() {
  const context = useContext(SearchQueryContext);
  if (context === undefined) {
    throw new Error("useSearchQuery must be used within a SearchQueryProvider");
  }
  return context;
}

export function SearchQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      startTransition,
      shallow: false,
    })
  );

  return (
    <SearchQueryContext.Provider value={{ query, setQuery, isPending }}>
      {children}
    </SearchQueryContext.Provider>
  );
}
