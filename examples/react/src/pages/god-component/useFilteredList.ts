import { useState } from "react";
import type { User, RoleFilter } from "./types";

type Filters = {
  search: string;
  role: RoleFilter;
};

export function useFilteredList(users: User[]) {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    role: "all",
  });

  function setFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const filtered = users.filter((u) => {
    if (filters.role !== "all" && u.role !== filters.role) return false;
    if (
      filters.search &&
      !u.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !u.email.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return { filters, setFilter, filtered };
}
