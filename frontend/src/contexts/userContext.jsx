/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentUserContext = createContext();

export default CurrentUserContext;

export function CurrentUserContextProvider({ children }) {
  // on utilise un hook personnalisé
  const [user, setUser] = useLocalStorage("user", {});
  const [token, setToken] = useLocalStorage("token", "");
  const [userID, setUserID] = React.useState(user.id);
  const [isMatch, setIsMatch] = React.useState(false);
  const [matchInfo, setMatchInfo] = React.useState(false);
  // Recup current slide

  const [getSlide, setGetSlide] = React.useState();

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CurrentUserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        userID,
        setUserID,
        isMatch,
        setIsMatch,
        matchInfo,
        setMatchInfo,
        getSlide,
        setGetSlide,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

CurrentUserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrentUserContext = () => useContext(CurrentUserContext);
