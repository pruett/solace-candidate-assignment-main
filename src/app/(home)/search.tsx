"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useSearchQuery } from "@/lib/search-query";

export function Search() {
  const { query, setQuery, isPending } = useSearchQuery();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex items-center w-full">
          <Input
            className="pr-10"
            value={query || ""}
            placeholder="Search"
            onChange={handleOnChange}
          />
          {isPending && (
            <Loader2 className="absolute size-4 right-2 animate-spin" />
          )}
        </div>

        <Button
          variant="secondary"
          onClick={() => {
            setQuery(null);
          }}
          disabled={!query || isPending}
        >
          Reset
        </Button>
      </div>
      <p className="text-sm text-muted-foreground/60">
        Find an advocate that&rsquo;s right for you. Search by name, city, or
        specialty.
      </p>
    </div>
  );
}
