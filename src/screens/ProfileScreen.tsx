import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, { FadeIn } from "react-native-reanimated";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

interface ProfileScreenProps {
  onLogout?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const [notifications, setNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    checkBiometricSettings();
    checkLoginStatus();
  }, []);

  const checkBiometricSettings = async () => {
    try {
      const enabled = await AsyncStorage.getItem("biometricEnabled");
      setBiometricEnabled(enabled === "true");
    } catch (error) {
      console.error("Erro ao carregar configurações biométricas:", error);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const savedUsername = await SecureStore.getItemAsync("username");
      if (savedUsername) {
        setIsLoggedIn(true);
        setCurrentUser(savedUsername);
      }
    } catch (error) {
      console.error("Erro ao verificar login:", error);
    }
  };

  const handleBiometricToggle = async (value: boolean) => {
    try {
      if (value) {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();

        if (!compatible || !enrolled) {
          Alert.alert(
            "Biometria Indisponível",
            "Seu dispositivo não suporta biometria ou não possui dados biométricos cadastrados."
          );
          return;
        }

        const auth = await LocalAuthentication.authenticateAsync({
          promptMessage: "Confirme sua biometria",
          fallbackLabel: "Use sua senha",
          cancelLabel: "Cancelar",
        });

        if (!auth.success) {
          return;
        }
      }

      await AsyncStorage.setItem("biometricEnabled", value.toString());
      setBiometricEnabled(value);
    } catch (error) {
      console.error("Erro ao configurar biometria:", error);
      Alert.alert("Erro", "Não foi possível configurar a biometria");
    }
  };

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

  const handleLogin = async () => {
    if (username === "admin" && password === "123456") {
      try {
        await SecureStore.setItemAsync("username", username);
        setIsLoggedIn(true);
        setCurrentUser(username);
        setUsername("");
        setPassword("");
      } catch (error) {
        console.error("Erro ao salvar dados:", error);
      }
    } else {
      Alert.alert("Erro", "Usuário ou senha inválidos");
    }
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("username");
      setIsLoggedIn(false);
      setCurrentUser("");
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <View style={styles.header}>
        <Icon name="account-circle" size={80} color="#F0B90B" />
        <Text style={styles.username}>
          {isLoggedIn ? `Olá, ${currentUser}!` : "Usuário"}
        </Text>
      </View>

      {isLoggedIn ? (
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuário"
            placeholderTextColor="#848E9C"
            value={username}
            onChangeText={(text) => setUsername(text.toLowerCase())}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              placeholderTextColor="#848E9C"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#848E9C"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.helpText}>
            Use as credenciais:{"\n"}
            Usuário: admin{"\n"}
            Senha: 123456
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segurança</Text>

          <View style={styles.menuItem}>
            <Icon name="fingerprint" size={24} color="#F0B90B" />
            <Text style={styles.menuText}>Login com Biometria</Text>
            <Switch
              value={biometricEnabled}
              onValueChange={handleBiometricToggle}
              trackColor={{ false: "#2B2F36", true: "#F0B90B" }}
              thumbColor={biometricEnabled ? "#FFFFFF" : "#848E9C"}
            />
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
    paddingTop: Platform.OS === "ios" ? 26 : 0,
  },
  header: {
    alignItems: "center",
    padding: 8,
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
    padding: 8,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 30,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2B2F36",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: "#FFFFFF",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#F0B90B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "transparent",
    padding: 6,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2B2F36",
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    color: "#FFFFFF",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  helpText: {
    color: "#848E9C",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
});

export default ProfileScreen;
