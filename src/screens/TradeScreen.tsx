import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, { FadeIn } from "react-native-reanimated";

const TradeScreen = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const renderOrderBook = () => (
    <View style={styles.orderBookContainer}>
      <Text style={styles.sectionTitle}>Livro de Ofertas</Text>
      <View style={styles.orderBookHeader}>
        <Text style={styles.orderBookHeaderText}>Preço</Text>
        <Text style={styles.orderBookHeaderText}>Quantidade</Text>
        <Text style={styles.orderBookHeaderText}>Total</Text>
      </View>
      {/* Simulação de ordens de venda */}
      {[...Array(5)].map((_, i) => (
        <View key={`sell-${i}`} style={styles.orderBookRow}>
          <Text style={[styles.orderBookText, styles.sellPrice]}>
            $45,{(900 + i * 10).toString()}
          </Text>
          <Text style={styles.orderBookText}>0.{(234 + i).toString()}</Text>
          <Text style={styles.orderBookText}>12,{(345 + i).toString()}</Text>
        </View>
      ))}

      <View style={styles.currentPrice}>
        <Text style={styles.currentPriceText}>$45,850</Text>
        <Text style={styles.priceChangeText}>+1.2%</Text>
      </View>

      {/* Simulação de ordens de compra */}
      {[...Array(5)].map((_, i) => (
        <View key={`buy-${i}`} style={styles.orderBookRow}>
          <Text style={[styles.orderBookText, styles.buyPrice]}>
            $45,{(800 - i * 10).toString()}
          </Text>
          <Text style={styles.orderBookText}>0.{(345 - i).toString()}</Text>
          <Text style={styles.orderBookText}>12,{(234 - i).toString()}</Text>
        </View>
      ))}
    </View>
  );

  const renderTradeForm = () => (
    <View style={styles.tradeFormContainer}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "buy" && styles.activeTab]}
          onPress={() => setActiveTab("buy")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "buy" && styles.activeTabText,
            ]}
          >
            Comprar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "sell" && styles.activeTab]}
          onPress={() => setActiveTab("sell")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "sell" && styles.activeTabText,
            ]}
          >
            Vender
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.orderTypeContainer}>
        <TouchableOpacity
          style={[
            styles.orderTypeButton,
            orderType === "limit" && styles.activeOrderType,
          ]}
          onPress={() => setOrderType("limit")}
        >
          <Text
            style={[
              styles.orderTypeText,
              orderType === "limit" && styles.activeOrderTypeText,
            ]}
          >
            Limite
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.orderTypeButton,
            orderType === "market" && styles.activeOrderType,
          ]}
          onPress={() => setOrderType("market")}
        >
          <Text
            style={[
              styles.orderTypeText,
              orderType === "market" && styles.activeOrderTypeText,
            ]}
          >
            Mercado
          </Text>
        </TouchableOpacity>
      </View>

      {orderType === "limit" && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Preço</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#848E9C"
          />
          <Text style={styles.inputSuffix}>USDT</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Quantidade</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor="#848E9C"
        />
        <Text style={styles.inputSuffix}>BTC</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          { backgroundColor: activeTab === "buy" ? "#0ecb81" : "#f6465d" },
        ]}
      >
        <Text style={styles.submitButtonText}>
          {activeTab === "buy" ? "Comprar BTC" : "Vender BTC"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <ScrollView>
        {renderOrderBook()}
        {renderTradeForm()}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2026",
  },
  orderBookContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2B2F36",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderBookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderBookHeaderText: {
    color: "#848E9C",
    fontSize: 12,
    flex: 1,
    textAlign: "right",
  },
  orderBookRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  orderBookText: {
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
    paddingVertical: 8,
    marginVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#2B2F36",
  },
  currentPriceText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  priceChangeText: {
    color: "#0ecb81",
    fontSize: 14,
  },
  tradeFormContainer: {
    padding: 16,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#F0B90B",
  },
  tabText: {
    color: "#848E9C",
    fontSize: 16,
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  orderTypeContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  orderTypeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: "#2B2F36",
  },
  activeOrderType: {
    backgroundColor: "#F0B90B",
  },
  orderTypeText: {
    color: "#848E9C",
  },
  activeOrderTypeText: {
    color: "#1E2026",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: "#FFFFFF",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#2B2F36",
    borderRadius: 4,
    padding: 12,
    color: "#FFFFFF",
  },
  inputSuffix: {
    position: "absolute",
    right: 12,
    top: 40,
    color: "#848E9C",
  },
  submitButton: {
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TradeScreen;
