import {
  createContext,
  useState,
  useEffect
} from "react";

export const ThemeContext =
  createContext();

function ThemeProvider({
  children
}) {

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {

    const savedTheme =
      localStorage.getItem(
        "darkMode"
      );

    if (savedTheme) {

      setDarkMode(
        JSON.parse(savedTheme)
      );

    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

  }, [darkMode]);

  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode
      }}
    >

      {children}

    </ThemeContext.Provider>

  );
}

export default ThemeProvider;