import { useContext } from "react";
import { PersonnelsContext } from "../context/PersonnelContext";

export const usePersonnelsContext = () => {
  const context = useContext(PersonnelsContext);

  if (!context) {
    throw new Error('usePersonnelsContext must be used within a PersonnelsContextProvider');
  }

  return context;
};
