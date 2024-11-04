import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onHide: () => void;
}

const Toast = ({ message, type = "success", onHide }: ToastProps) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: type === "success" ? "#0ecb81" : "#f6465d",
          opacity,
        },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Toast;
