import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, { FadeIn } from "react-native-reanimated";
import MarketsHeader from "../components/markets/MarketsHeader";
import { CryptoData } from "../types/market";
import MarketListItem from "../components/markets/MarketListItem";

const MarketsScreen = () => {
  const [markets, setMarkets] = useState<CryptoData[]>([]);
  const [filteredMarkets, setFilteredMarkets] = useState<CryptoData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [previousPrices, setPreviousPrices] = useState<Record<string, string>>(
    {}
  );

  const fetchMarketData = async () => {
    try {
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/24hr"
      );
      const data = await response.json();

      const newPreviousPrices: Record<string, string> = {};
      markets.forEach((market) => {
        newPreviousPrices[market.symbol] = market.price;
      });
      setPreviousPrices(newPreviousPrices);

      const filteredData = data
        .filter((item: any) => item.symbol.endsWith("USDT"))
        .slice(0, 50)
        .map((item: any) => ({
          symbol: item.symbol.replace("USDT", ""),
          price: parseFloat(item.lastPrice).toFixed(2),
          priceChange: parseFloat(item.priceChange).toFixed(2),
          priceChangePercent: parseFloat(item.priceChangePercent).toFixed(2),
          volume: parseFloat(item.volume).toFixed(2),
        }));
      setMarkets(filteredData);
      applyFilters(filteredData, searchQuery, selectedFilter, sortOrder);
    } catch (error) {
      console.error("Error fetching market data:", error);
    }
  };

  const applyFilters = useCallback(
    (
      data: CryptoData[],
      search: string,
      filter: string,
      sort: "asc" | "desc"
    ) => {
      let result = [...data];

      // Aplicar busca
      if (search) {
        result = result.filter((item) =>
          item.symbol.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Aplicar filtros
      if (filter === "gainers") {
        result = result.filter(
          (item) => parseFloat(item.priceChangePercent) > 0
        );
      } else if (filter === "losers") {
        result = result.filter(
          (item) => parseFloat(item.priceChangePercent) < 0
        );
      }

      // Aplicar ordenação
      result.sort((a, b) => {
        const changeA = parseFloat(a.priceChangePercent);
        const changeB = parseFloat(b.priceChangePercent);
        return sort === "asc" ? changeA - changeB : changeB - changeA;
      });

      setFilteredMarkets(result);
    },
    []
  );

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    applyFilters(markets, searchQuery, selectedFilter, sortOrder);
  }, [searchQuery, selectedFilter, sortOrder, markets]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMarketData();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: CryptoData }) => (
    <MarketListItem item={item} previousPrice={previousPrices[item.symbol]} />
  );

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <MarketsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        sortOrder={sortOrder}
        onSortChange={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      />

      <FlatList
        data={filteredMarkets}
        renderItem={renderItem}
        keyExtractor={(item) => item.symbol}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#F0B90B"
          />
        }
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2026",
    paddingTop: Platform.OS === "ios" ? 26 : 0,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2B2F36",
  },
  symbolContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  symbolText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pairText: {
    color: "#848E9C",
    fontSize: 16,
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  changeText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 2,
  },
});

export default MarketsScreen;
