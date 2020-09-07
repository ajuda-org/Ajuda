import React, { createContext, useContext } from 'react';
import { useProfile } from "./profile";

interface ITheme {
  theme : {
    PrimaryColor: string;
    SecondColor: string;
    TextColor: string;
  }
}

const ThemeContext = createContext<ITheme>({
  theme : {
    PrimaryColor: "",
    SecondColor: "",
    TextColor: ""
  }
});

const ThemeProvider: React.FC = ({children}) => {
  const { profile } = useProfile();
  const PrimaryColors = {
    Helper: "#54C7C0",
    Helped: "#516DF5",
    "": ""
  }
  const SecondColors = {
    Helper: "#82E0DB",
    Helped: "#7189FC",
    "": ""
  }
  const TextColors = {
    Helper: "#0C2423",
    Helped: "#2B3876",
    "": ""
  }
  
  const theme = {
    PrimaryColor: PrimaryColors[profile],
    SecondColor: SecondColors[profile],
    TextColor: TextColors[profile]
  }

  const defaultTheme = theme;

  return (
    <ThemeContext.Provider value={{ theme: defaultTheme }}> 
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

export function useTheme() {
  const context = useContext<ITheme>(ThemeContext)
  const { theme } = context
  return { theme }
}