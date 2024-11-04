import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface OrderBookProps {
  asks: Array<[string, string]>;
  bids: Array<[string, string]>;
  lastPrice: string;
  priceChangePercent: string;
}

const OrderBook = ({
  asks,
  bids,
  lastPrice,
  priceChangePercent,
}: OrderBookProps) => {
  const formatNumber = (num: string) => {
    return parseFloat(num).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livro de Ofertas</Text>

      <View style={styles.ordersContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Preço</Text>
          <Text style={styles.headerText}>Quantidade</Text>
          <Text style={styles.headerText}>Total</Text>
        </View>

        <ScrollView>
          {asks.map(([price, amount], index) => (
            <View key={`ask-${index}`} style={styles.orderRow}>
              <Text style={[styles.orderText, styles.sellPrice]}>
                ${formatNumber(price)}
              </Text>
              <Text style={styles.orderText}>{formatNumber(amount)}</Text>
              <Text style={styles.orderText}>
                $
                {formatNumber(
                  (parseFloat(price) * parseFloat(amount)).toString()
                )}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.currentPrice}>
        <Text style={styles.priceText}>${formatNumber(lastPrice)}</Text>
        <Text
          style={[
            styles.changeText,
            {
              color:
                parseFloat(priceChangePercent) >= 0 ? "#0ecb81" : "#f6465d",
            },
          ]}
        >
          {parseFloat(priceChangePercent) >= 0 ? "+" : ""}
          {priceChangePercent}%
        </Text>
      </View>

      <View style={styles.ordersContainer}>
        <ScrollView>
          {bids.map(([price, amount], index) => (
            <View key={`bid-${index}`} style={styles.orderRow}>
              <Text style={[styles.orderText, styles.buyPrice]}>
                ${formatNumber(price)}
              </Text>
              <Text style={styles.orderText}>{formatNumber(amount)}</Text>
              <Text style={styles.orderText}>
                $
                {formatNumber(
                  (parseFloat(price) * parseFloat(amount)).toString()
                )}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#1E2026",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  ordersContainer: {
    height: 200,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2B2F36",
  },
  headerText: {
    color: "#848E9C",
    fontSize: 12,
    flex: 1,
    textAlign: "right",
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  orderText: {
    color: "#FFFFFF",
    fontSize: 12,
    flex: 1,
    textAlign: "right",
  },
  sellPrice: {
    color: "#f6465d",
  },
  buyPrice: {
    color: "#0ecb81",
  },
  currentPrice: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#2B2F36",
    marginVertical: 8,
  },
  priceText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 8,
  },
  changeText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default OrderBook;
