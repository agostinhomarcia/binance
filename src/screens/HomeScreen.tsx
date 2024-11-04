import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Animated, { FadeIn } from "react-native-reanimated";
import { formatPrice, formatPercentage } from "../utils/formatters";

const calculateMA = (data: number[], period: number = 5) => {
  return data.map((_, index) => {
    if (index < period - 1) return null;
    const slice = data.slice(index - period + 1, index + 1);
    const sum = slice.reduce((a, b) => a + b, 0);
    return sum / period;
  });
};

const calculateRSI = (data: number[], period: number = 14) => {
  let gains = 0;
  let losses = 0;

  const rsi = data.map((value, index) => {
    if (index === 0) return null;
    const difference = value - data[index - 1];
    if (difference > 0) {
      gains += difference;
    } else {
      losses -= difference;
    }

    if (index < period) return null;

    const averageGain = gains / period;
    const averageLoss = losses / period;
    const rs = averageGain / averageLoss;
    return 100 - 100 / (1 + rs);
  });

  return rsi;
};

const HomeScreen = () => {
  const [chartData, setChartData] = useState({
    labels: ["06:52", "06:53", "06:54", "06:55", "06:56"],
    datasets: [
      {
        data: [66.875, 66.88, 66.84, 66.9, 66.92],
      },
    ],
  });

  const [activeInterval, setActiveInterval] = useState<string | null>("5m");

  const currentPrice = chartData.datasets[0].data[4];
  const previousPrice = chartData.datasets[0].data[3];
  const priceChange = currentPrice - previousPrice;
  const percentChange = (priceChange / previousPrice) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = (66.8 + Math.random() * 0.2).toFixed(3);
      const currentTime = new Date();
      const timeString = currentTime.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      setChartData((prevData) => {
        const newLabels = [...prevData.labels.slice(1), timeString];
        const newData = [
          ...prevData.datasets[0].data.slice(1),
          parseFloat(newPrice),
        ];

        return {
          labels: newLabels,
          datasets: [
            {
              data: newData,
              color: (opacity = 1) => `rgba(240, 185, 11, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleIntervalPress = (interval: string) => {
    if (activeInterval === interval) {
      setActiveInterval(null);
    } else {
      setActiveInterval(interval);
    }
  };

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.priceContainer, { marginTop: 0 }]}>
          <Text style={styles.currentPrice}>{formatPrice(currentPrice)}</Text>
          <Text
            style={[
              styles.priceChange,
              { color: priceChange >= 0 ? "#0ecb81" : "#f6465d" },
            ]}
          >
            {formatPercentage(percentChange)}
          </Text>
        </View>

        <View style={styles.intervalContainer}>
          {["1m", "5m", "15m", "1h"].map((interval) => (
            <TouchableOpacity
              key={interval}
              style={[
                styles.intervalButton,
                activeInterval === interval && styles.activeInterval,
              ]}
              onPress={() => handleIntervalPress(interval)}
            >
              <Text
                style={[
                  styles.intervalText,
                  activeInterval === interval && styles.activeIntervalText,
                ]}
              >
                {interval}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={Dimensions.get("window").width - 32}
            height={220}
            chartConfig={{
              backgroundColor: "#1E2026",
              backgroundGradientFrom: "#1E2026",
              backgroundGradientTo: "#1E2026",
              decimalPlaces: 3,
              color: (opacity = 1) => `rgba(240, 185, 11, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#F0B90B",
              },
              propsForBackgroundLines: {
                strokeDasharray: "",
                stroke: "#2B2F36",
              },
            }}
            bezier
            style={styles.chart}
            withVerticalLines={true}
            withHorizontalLines={true}
            withDots={true}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLabels={true}
            withHorizontalLabels={true}
          />
        </View>

        <View style={[styles.chartContainer, styles.secondChart]}>
          <LineChart
            data={chartData}
            width={Dimensions.get("window").width - 32}
            height={220}
            chartConfig={{
              backgroundColor: "#1E2026",
              backgroundGradientFrom: "#1E2026",
              backgroundGradientTo: "#1E2026",
              decimalPlaces: 3,
              color: (opacity = 1) => `rgba(240, 185, 11, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#F0B90B",
              },
              propsForBackgroundLines: {
                strokeDasharray: "",
                stroke: "#2B2F36",
              },
            }}
            bezier
            style={styles.chart}
            withVerticalLines={true}
            withHorizontalLines={true}
            withDots={true}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLabels={true}
            withHorizontalLabels={true}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2026",
    paddingTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#2B2F36",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  currentPrice: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
    fontFamily: "System",
  },
  priceChange: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "System",
  },
  intervalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    backgroundColor: "#2B2F36",
    marginHorizontal: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  intervalButton: {
    padding: 8,
    borderRadius: 4,
    minWidth: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3F4252",
  },
  activeInterval: {
    backgroundColor: "#F0B90B",
    borderColor: "#F0B90B",
  },
  intervalText: {
    color: "#848E9C",
    fontSize: 12,
  },
  activeIntervalText: {
    color: "#1E2026",
    fontWeight: "bold",
  },
  chartContainer: {
    padding: 16,
    marginBottom: 8,
  },
  secondChart: {
    marginBottom: 90,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default HomeScreen;
