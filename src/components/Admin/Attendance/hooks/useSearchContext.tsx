import { createContext, useContext, useState, useMemo, type PropsWithChildren } from "react";

export interface SearchContextType {
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
  searchText: string;
  setSearchText: (query: string) => void;
}

function createSearchContext() {
  const SearchContext = createContext<SearchContextType | null>(null);

  function SearchContextProvider({ children }: PropsWithChildren) {
    const [isFocused, setIsFocused] = useState(false);
    const [searchText, setSearchText] = useState("");

    const value = useMemo(
      () => ({
        isFocused,
        setIsFocused,
        searchText,
        setSearchText
      }),
      [isFocused, searchText]
    );

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
  }

  const useSearchContext = () => {
    const context = useContext(SearchContext);

    if (!context) {
      throw new Error("useSearchContext must be used within a SearchContextProvider");
    }
    return context;
  };

  return { SearchContextProvider, useSearchContext };
}
export const MainSearchContext = createSearchContext();
export const ModeSearchContext = createSearchContext();
