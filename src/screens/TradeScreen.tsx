import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, { FadeIn } from "react-native-reanimated";
import OrderBook from "../components/trade/OrderBook";

const TradeScreen = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("0.00");
  const [orderBookData, setOrderBookData] = useState({
    asks: [] as Array<[string, string]>,
    bids: [] as Array<[string, string]>,
    lastPrice: "45850.00",
    priceChangePercent: "1.2",
  });

  const calculateTotal = useCallback(() => {
    if (price && amount) {
      const totalValue = parseFloat(price) * parseFloat(amount);
      setTotal(totalValue.toFixed(2));
    } else {
      setTotal("0.00");
    }
  }, [price, amount]);

  const validateFields = (): boolean => {
    if (orderType === "limit" && !price) {
      Alert.alert("Erro", "Por favor, insira um preço");
      return false;
    }
    if (!amount) {
      Alert.alert("Erro", "Por favor, insira uma quantidade");
      return false;
    }
    if (parseFloat(amount) <= 0) {
      Alert.alert("Erro", "A quantidade deve ser maior que zero");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    Alert.alert(
      "Confirmar Ordem",
      `Você deseja ${
        activeTab === "buy" ? "comprar" : "vender"
      } ${amount} BTC ${
        orderType === "limit" ? `por $${price}` : "a preço de mercado"
      }?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            console.log("Ordem executada:", {
              type: activeTab,
              orderType,
              price,
              amount,
              total,
            });

            setPrice("");
            setAmount("");
            setTotal("0.00");

            Alert.alert(
              "Sucesso",
              `Ordem de ${
                activeTab === "buy" ? "compra" : "venda"
              } enviada com sucesso!`
            );
          },
        },
      ]
    );
  };

  useEffect(() => {
    const generateOrderBookData = () => {
      const asks = Array.from({ length: 10 }, (_, i) => {
        const price = (45900 + i * 10).toString();
        const amount = (Math.random() * 2).toFixed(4);
        return [price, amount];
      });

      const bids = Array.from({ length: 10 }, (_, i) => {
        const price = (45800 - i * 10).toString();
        const amount = (Math.random() * 2).toFixed(4);
        return [price, amount];
      });

      setOrderBookData((prev) => ({
        ...prev,
        asks: asks as Array<[string, string]>,
        bids: bids as Array<[string, string]>,
      }));
    };

    generateOrderBookData();
    const interval = setInterval(generateOrderBookData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Animated.View entering={FadeIn} style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <OrderBook
            asks={orderBookData.asks}
            bids={orderBookData.bids}
            lastPrice={orderBookData.lastPrice}
            priceChangePercent={orderBookData.priceChangePercent}
          />

          <View style={styles.tradeFormContainer}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === "buy" && styles.buyTab]}
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
                style={[styles.tab, activeTab === "sell" && styles.sellTab]}
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

            {orderType === "limit" && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Preço</Text>
                <TextInput
                  style={styles.input}
                  value={price}
                  onChangeText={(text) => {
                    setPrice(text);
                    calculateTotal();
                  }}
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
                onChangeText={(text) => {
                  setAmount(text);
                  calculateTotal();
                }}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="#848E9C"
              />
              <Text style={styles.inputSuffix}>BTC</Text>
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total} USDT</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor: activeTab === "buy" ? "#0ecb81" : "#f6465d",
                  opacity: !amount || (orderType === "limit" && !price) ? 0.5 : 1,
                },
              ]}
              onPress={handleSubmit}
              disabled={!amount || (orderType === "limit" && !price)}
            >
              <Text style={styles.submitButtonText}>
                {activeTab === "buy" ? "Comprar BTC" : "Vender BTC"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2026",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
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
  buyTab: {
    borderBottomColor: "#0ecb81",
    borderBottomWidth: 2,
  },
  sellTab: {
    borderBottomColor: "#f6465d",
    borderBottomWidth: 2,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 12,
  },
  totalLabel: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  totalValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TradeScreen;
