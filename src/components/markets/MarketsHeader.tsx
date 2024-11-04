import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface MarketsHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  sortOrder: "asc" | "desc";
  onSortChange: () => void;
}

const MarketsHeader = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  sortOrder,
  onSortChange,
}: MarketsHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#848E9C" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar criptomoeda..."
          placeholderTextColor="#848E9C"
          value={searchQuery}
          onChangeText={onSearchChange}
          selectionColor="#F0B90B"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "all" && styles.filterButtonActive,
          ]}
          onPress={() => onFilterChange("all")}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "all" && styles.filterTextActive,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "gainers" && styles.filterButtonActive,
          ]}
          onPress={() => onFilterChange("gainers")}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "gainers" && styles.filterTextActive,
            ]}
          >
            Ganhos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "losers" && styles.filterButtonActive,
          ]}
          onPress={() => onFilterChange("losers")}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "losers" && styles.filterTextActive,
            ]}
          >
            Perdas
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.sortButton} onPress={onSortChange}>
        <Icon
          name={sortOrder === "asc" ? "sort-ascending" : "sort-descending"}
          size={24}
          color="#F0B90B"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#1E2026",
    borderBottomWidth: 1,
    borderBottomColor: "#2B2F36",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2B2F36",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    paddingVertical: 8,
    marginLeft: 8,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#2B2F36",
  },
  filterButtonActive: {
    backgroundColor: "#F0B90B",
  },
  filterText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  filterTextActive: {
    color: "#1E2026",
  },
  sortButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
});

export default MarketsHeader;
