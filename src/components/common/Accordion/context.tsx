import { createContext, useContext, useState } from "react";

interface AccordionContextValue {
  expanded: boolean;
  toggleExpanded: () => void;
}

export const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionProviderProps {
  children: React.ReactNode;
}

export function AccordionProvider({ children }: AccordionProviderProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <AccordionContext.Provider value={{ expanded, toggleExpanded }}>
      {children}
    </AccordionContext.Provider>
  );
}

export function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("useAccordionContext must be used within an AccordionProvider");
  }

  return context;
}
