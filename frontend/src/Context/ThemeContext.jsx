import { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const ThemeContext = createContext();

// Custom hook for easier access
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check for user preference and apply the correct theme class to the body
    const userPreference = localStorage.getItem('theme') === 'dark';
    setIsDarkTheme(userPreference);
    document.body.classList.toggle('dark', userPreference);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.body.classList.toggle('dark', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
