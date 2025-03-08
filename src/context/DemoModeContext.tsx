import React, { createContext, useContext, useState, ReactNode } from "react";

interface DemoModeContextType {
  isDemoMode: boolean;
  setIsDemoMode: (value: boolean) => void;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(
  undefined,
);

export const DemoModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Set default to true for demo mode
  const [isDemoMode, setIsDemoMode] = useState(true);

  return (
    <DemoModeContext.Provider value={{ isDemoMode, setIsDemoMode }}>
      {children}
    </DemoModeContext.Provider>
  );
};

export const useDemoMode = (): DemoModeContextType => {
  const context = useContext(DemoModeContext);
  if (context === undefined) {
    throw new Error("useDemoMode must be used within a DemoModeProvider");
  }
  return context;
};
