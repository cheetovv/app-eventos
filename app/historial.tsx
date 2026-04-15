import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

export default function HistorialScreen() {

  useEffect(() => {
    cargarHistorial();
  }, []);

  const [lista, setLista] = useState<any[]>([]);

  const cargarHistorial = async () => {
    try{
      const response = await fetch("http://192.168.0.12:3000/historial");
      const data = await response.json();
      setLista(data);
    } catch (error) {
      console.log("Error cargando historial");
    }
  };

  const limpiarHistorial = async () => {
      await AsyncStorage.removeItem("historial");
      setLista([]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Historial</Text>
      
      <Text style={styles.deleteButton} onPress={limpiarHistorial}>
      Limpiar historial  
      </Text>

      <FlatList
        data={lista}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={styles.item}>

                <Text style={styles.nombre}>
                  {item.estado === "valido" && "🟢"}
                  {item.estado === "ya_usado" && "🔴"}
                  {item.estado === "no_encontrado" && "❌"}{" "}
                  {item.nombre}
                </Text>

                {item.email ?(
                  <Text style={styles.email}>{item.email}</Text>
                ): null}

                <Text style={styles.hora}>
                  {new Date(item.fecha).toLocaleString()}
                </Text>
            </View>
        )}
      />
    </SafeAreaView>
    
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
    textAlign: "center",
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
    textAlign: "right",
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  hora: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});