'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';

export interface SearchContextType {
  search?: string;
  setSearch(query: string): void;
  isLoading?: boolean;
  setIsLoading(value: boolean): void;
  toogleIsLoading(): void;
}

export const SearchContext = createContext<SearchContextType>({
  setSearch: () => [],
  setIsLoading: () => [],
  toogleIsLoading: () => [],
});

export function SearchProvider({ children }: PropsWithChildren) {
  const [search, setSearch] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        isLoading,
        setIsLoading,
        toogleIsLoading: () => setIsLoading((prev) => !prev),
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
