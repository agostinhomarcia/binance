import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/HomeScreen";
import MarketsScreen from "../screens/MarketsScreen";
import TradeScreen from "../screens/TradeScreen";

const Tab = createBottomTabNavigator();

export default function AppContent() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1E2026",
          borderTopWidth: 0,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: "#F0B90B",
        tabBarInactiveTintColor: "#848E9C",
        headerStyle: {
          backgroundColor: "#1E2026",
        },
        headerTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="view-dashboard" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Markets"
        component={MarketsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="chart-line" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Trade"
        component={TradeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="swap-horizontal" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
