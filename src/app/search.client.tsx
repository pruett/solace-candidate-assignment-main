"use client";

import { useTransition } from "react";
import { parseAsString, useQueryState } from "nuqs";

export function Search() {
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      startTransition,
      shallow: false,
    })
  );

  return (
    <div>
      <p>Search</p>
      <p>Searching for: {query}</p>
      <input
        value={query || ""}
        style={{ border: "1px solid black" }}
        onChange={(evt) => setQuery(evt.target.value)}
      />
      {isPending && <span>...</span>}
      <button
        onClick={() => {
          setQuery(null);
        }}
      >
        Reset
      </button>
    </div>
  );
}
