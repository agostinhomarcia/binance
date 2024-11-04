import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, { FadeIn } from "react-native-reanimated";

const ProfileScreen = () => {
  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Icon name="account-circle" size={80} color="#F0B90B" />
          <Text style={styles.username}>Usuário</Text>
          <Text style={styles.email}>usuario@email.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Carteira</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="wallet" size={24} color="#F0B90B" />
            <Text style={styles.menuText}>Depósito</Text>
            <Icon name="chevron-right" size={24} color="#848E9C" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="bank-transfer" size={24} color="#F0B90B" />
            <Text style={styles.menuText}>Saque</Text>
            <Icon name="chevron-right" size={24} color="#848E9C" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segurança</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="shield-check" size={24} color="#F0B90B" />
            <Text style={styles.menuText}>Verificação 2FA</Text>
            <Icon name="chevron-right" size={24} color="#848E9C" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="key-variant" size={24} color="#F0B90B" />
            <Text style={styles.menuText}>Alterar Senha</Text>
            <Icon name="chevron-right" size={24} color="#848E9C" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
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
  email: {
    color: "#848E9C",
    fontSize: 16,
    marginTop: 5,
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
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: "#f6465d",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
