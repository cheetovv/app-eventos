import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function HistorialScreen() {
    const { data } = useLocalSearchParams();
    const historial = data ? JSON.parse(data as string) : [];
    const [lista, setLista] = useState(historial);

    const limpiarHistorial = async () => {
      await AsyncStorage.removeItem("historial");
      setLista([]);
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Historial</Text>
      
      <Text style={styles.deleteButton} onPress={limpiarHistorial}>
        🗑️ Limpiar historial  
      </Text>

      <FlatList
        data={lista}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={styles.item}>
                <Text style={styles.text}>
                    {item.estado === "valido" && "✅"}
                    {item.estado === "ya_usado" && "⚠️"}
                    {item.estado === "no_encontrado" && "❌"}{" "}
                    {item.nombre} - {item.hora}
                </Text>
            </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  text: {
    fontSize: 16,
  },
  deleteButton: {
    color: "red",
    marginBottom: 10,
  },
});