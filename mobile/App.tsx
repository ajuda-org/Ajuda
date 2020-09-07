import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppStack from './src/routes/AppStack';
import ProfileProvider from "./src/contexts/profile";
import ThemeProvider from "./src/contexts/theme";

export default function App() {
  return (
    <ProfileProvider>
      <ThemeProvider>
        <AppStack />
        <StatusBar style="light" />
      </ThemeProvider>
    </ProfileProvider>
  );
}