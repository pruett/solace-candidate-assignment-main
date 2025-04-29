import { Skeleton } from "@/components/ui/skeleton";

export function AdvocatesSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-10 border" />
        <Skeleton className="aspect-video border" />
      </div>
    </div>
  );
}
