import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSequence,
  useSharedValue,
} from "react-native-reanimated";
import { CryptoData } from "../../types/market";

interface MarketListItemProps {
  item: CryptoData;
  previousPrice?: string;
}

const MarketListItem = ({ item, previousPrice }: MarketListItemProps) => {
  const priceBackgroundColor = useSharedValue("transparent");

  useEffect(() => {
    if (previousPrice && previousPrice !== item.price) {
      const isIncrease = parseFloat(item.price) > parseFloat(previousPrice);
      priceBackgroundColor.value = withSequence(
        withTiming(
          isIncrease ? "rgba(14, 203, 129, 0.2)" : "rgba(246, 70, 93, 0.2)",
          { duration: 300 }
        ),
        withTiming("transparent", { duration: 300 })
      );
    }
  }, [item.price]);

  const animatedPriceStyle = useAnimatedStyle(() => ({
    backgroundColor: priceBackgroundColor.value,
  }));

  const isPositive = parseFloat(item.priceChange) >= 0;

  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.leftContent}>
        <View style={styles.symbolContainer}>
          <Text style={styles.symbolText}>{item.symbol}</Text>
          <Text style={styles.pairText}>/USDT</Text>
        </View>
        <Text style={styles.volumeText}>Vol: {item.volume}</Text>
      </View>

      <View style={styles.rightContent}>
        <Animated.View style={[styles.priceContainer, animatedPriceStyle]}>
          <Text style={styles.priceText}>${item.price}</Text>
        </Animated.View>
        <View style={[{ backgroundColor: isPositive ? "#16c784" : "#f6465d" }]}>
          <Icon
            name={isPositive ? "arrow-up" : "arrow-down"}
            size={12}
            color="white"
          />
          <Text style={styles.changeText}>{item.priceChange}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2B2F36",
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: "flex-end",
  },
  symbolContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  symbolText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  pairText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 4,
    opacity: 0.6,
  },
  volumeText: {
    color: "#FFFFFF",
    fontSize: 12,
    opacity: 0.6,
  },
  priceContainer: {
    borderRadius: 4,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  priceText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  changeText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginLeft: 2,
  },
});

export default MarketListItem;
