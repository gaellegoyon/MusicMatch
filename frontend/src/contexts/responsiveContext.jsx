/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";

const CurrentResponsiveContext = createContext();

export default CurrentResponsiveContext;

export function CurrentResponsiveContextProvider({ children }) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1025px)",
  });

  const isTablet = useMediaQuery({
    minWidth: 661,
    maxWidth: 1024,
  });

  const isMobile = useMediaQuery({
    minWidth: 381,
    maxWidth: 660,
  });

  const isLittleMobile = useMediaQuery({
    query: "(max-width: 380px)",
  });
  return (
    <CurrentResponsiveContext.Provider
      value={{ isDesktop, isMobile, isTablet, isLittleMobile }}
    >
      {children}
    </CurrentResponsiveContext.Provider>
  );
}

export const useCurrentResponsiveContext = () =>
  useContext(CurrentResponsiveContext);
