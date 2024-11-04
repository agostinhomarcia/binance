import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, { FadeIn } from "react-native-reanimated";

import HomeScreen from "../screens/HomeScreen";
import MarketsScreen from "../screens/MarketsScreen";

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

// Placeholder screens
const TradeScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Hello world, esta é a página Trade!</Text>
  </View>
);
