import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppContent from "./src/app";

export default function App() {
  return (
    <NavigationContainer>
      <AppContent />
    </NavigationContainer>
  );
}
