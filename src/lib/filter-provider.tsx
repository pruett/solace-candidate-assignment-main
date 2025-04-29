"use client";

import { useQueryState } from "nuqs";
import { parseAsString } from "nuqs/server";
import { createContext, useContext, useTransition } from "react";

type FilterContextType = {
  filter: string;
  setFilter: (value: string | null) => void;
  isPending: boolean;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useSearchQuery() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useSearchQuery must be used within a SearchQueryProvider");
  }
  return context;
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [isPending, startTransition] = useTransition();

  const [filter, setFilter] = useQueryState(
    "f",
    parseAsString.withDefault("").withOptions({
      startTransition,
      shallow: false,
    })
  );

  return (
    <FilterContext.Provider value={{ filter, setFilter, isPending }}>
      {children}
    </FilterContext.Provider>
  );
}
