import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function HistorialScreen() {
    const { data } = useLocalSearchParams();

    const historial = data ? JSON.parse(data as string) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Historial</Text>

      <FlatList
        data={historial}
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
});