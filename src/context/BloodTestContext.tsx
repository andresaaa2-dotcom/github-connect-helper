import React, { createContext, useContext, useState, type ReactNode } from "react";

interface BloodTestContextType {
  hasUploadedBloodTest: boolean;
  setHasUploadedBloodTest: (v: boolean) => void;
}

const BloodTestContext = createContext<BloodTestContextType>({
  hasUploadedBloodTest: false,
  setHasUploadedBloodTest: () => {},
});

export const BloodTestProvider = ({ children }: { children: ReactNode }) => {
  const [hasUploadedBloodTest, setHasUploadedBloodTest] = useState(false);
  return (
    <BloodTestContext.Provider value={{ hasUploadedBloodTest, setHasUploadedBloodTest }}>
      {children}
    </BloodTestContext.Provider>
  );
};

export const useBloodTest = () => useContext(BloodTestContext);
