import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, { FadeIn } from "react-native-reanimated";

const ProfileScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [currency, setCurrency] = useState("USD");

  const handleCurrencyChange = () => {
    Alert.alert("Selecionar Moeda", "Escolha sua moeda preferida", [
      { text: "USD", onPress: () => setCurrency("USD") },
      { text: "EUR", onPress: () => setCurrency("EUR") },
      { text: "BRL", onPress: () => setCurrency("BRL") },
    ]);
  };

  const clearAppData = () => {
    Alert.alert(
      "Limpar Dados",
      "Tem certeza que deseja limpar todos os dados do app?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: () => console.log("Dados limpos"),
        },
      ]
    );
  };

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Icon name="account-circle" size={80} color="#F0B90B" />
          <Text style={styles.username}>Usuário</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>

          <View style={styles.menuItem}>
            <Icon name="bell-outline" size={24} color="#F0B90B" />
            <Text style={styles.menuText}>Notificações</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#2B2F36", true: "#F0B90B" }}
              thumbColor={notifications ? "#FFFFFF" : "#848E9C"}
            />
          </View>

          <View style={styles.menuItem}>
            <Icon name="chart-line" size={24} color="#F0B90B" />
            <Text style={styles.menuText}>Alertas de Preço</Text>
            <Switch
              value={priceAlerts}
              onValueChange={setPriceAlerts}
              trackColor={{ false: "#2B2F36", true: "#F0B90B" }}
              thumbColor={priceAlerts ? "#FFFFFF" : "#848E9C"}
            />
          </View>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleCurrencyChange}
          >
            <Icon name="currency-usd" size={24} color="#F0B90B" />
            <Text style={styles.menuText}>Moeda Principal</Text>
            <Text style={styles.valueText}>{currency}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favoritos</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="star-outline" size={24} color="#F0B90B" />
            <Text style={styles.menuText}>Gerenciar Favoritos</Text>
            <Icon name="chevron-right" size={24} color="#848E9C" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações do App</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="chart-box-outline" size={24} color="#F0B90B" />
            <Text style={styles.menuText}>Configurações dos Gráficos</Text>
            <Icon name="chevron-right" size={24} color="#848E9C" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="refresh" size={24} color="#F0B90B" />
            <Text style={styles.menuText}>Intervalo de Atualização</Text>
            <Icon name="chevron-right" size={24} color="#848E9C" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={clearAppData}>
            <Icon name="trash-can-outline" size={24} color="#f6465d" />
            <Text style={[styles.menuText, { color: "#f6465d" }]}>
              Limpar Dados
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>

          <View style={styles.menuItem}>
            <Icon name="information-outline" size={24} color="#F0B90B" />
            <Text style={styles.menuText}>Versão do App</Text>
            <Text style={styles.valueText}>1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2026",
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2B2F36",
  },
  username: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2B2F36",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    marginLeft: 16,
  },
  valueText: {
    color: "#848E9C",
    fontSize: 16,
  },
});

export default ProfileScreen;
