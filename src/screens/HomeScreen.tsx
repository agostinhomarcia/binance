import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryCandlestick,
} from "victory-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { LineDataPoint, CandleDataPoint } from "../types/chart";

const HomeScreen = () => {
  const [lineData, setLineData] = useState<LineDataPoint[]>([]);
  const [candleData, setCandleData] = useState<CandleDataPoint[]>([]);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@kline_1m"
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLineData((currentData: LineDataPoint[]) =>
        [
          ...currentData,
          {
            x: new Date(data.k.t),
            y: parseFloat(data.k.c),
          },
        ].slice(-50)
      );

      setCandleData((currentData) =>
        [
          ...currentData,
          {
            x: new Date(data.k.t),
            open: parseFloat(data.k.o),
            close: parseFloat(data.k.c),
            high: parseFloat(data.k.h),
            low: parseFloat(data.k.l),
          },
        ].slice(-50)
      );
    };

    return () => ws.close();
  }, []);

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          data={lineData}
          style={{
            data: { stroke: "#F0B90B" },
          }}
          animate
        />
      </VictoryChart>

      <VictoryChart theme={VictoryTheme.material}>
        <VictoryCandlestick
          data={candleData}
          candleColors={{
            positive: "#03C087",
            negative: "#CF304A",
          }}
          animate
        />
      </VictoryChart>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2026",
    padding: 10,
  },
});

export default HomeScreen;
