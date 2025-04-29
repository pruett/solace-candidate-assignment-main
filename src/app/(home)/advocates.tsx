"use client";

import { use } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdvocateWithSpecialties } from "@/db/schema";
import { useSearchQuery } from "@/lib/filter-provider";
import { AdvocatesSkeleton } from "./advocates-skeleton";

export function Advocates({
  data,
}: {
  data: Promise<AdvocateWithSpecialties[]>;
}) {
  const { isPending } = useSearchQuery();

  if (isPending) return <AdvocatesSkeleton />;

  const advocates = use(data);

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Degree</TableHead>
          <TableHead>Specialties</TableHead>
          <TableHead>Years of Experience</TableHead>
          <TableHead>Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {advocates.map((advocate) => (
          <AdvocateRow
            key={`${advocate.id}-${advocate.lastName}`}
            advocate={advocate}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function AdvocateRow({ advocate }: { advocate: AdvocateWithSpecialties }) {
  return (
    <TableRow>
      <TableCell>{advocate.firstName}</TableCell>
      <TableCell>{advocate.lastName}</TableCell>
      <TableCell>{advocate.city}</TableCell>
      <TableCell>{advocate.degree}</TableCell>
      <TableCell>
        <ul className="space-y-0.5">
          {(advocate.specialties as string[]).map((s) => (
            <li className="list-disc list-inside" key={s}>
              {s}
            </li>
          ))}
        </ul>
      </TableCell>
      <TableCell>{advocate.yearsOfExperience}</TableCell>
      <TableCell>{advocate.phoneNumber}</TableCell>
    </TableRow>
  );
}
