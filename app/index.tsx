import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Home(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Control de Eventos</Text>

            <Text style={styles.button} onPress={() => router.push("/scan")}
                >
                    Escanear
            </Text>

            <Text style={styles.button} onPress={() => router.push("/historial")}
                >
                    Ver Historial
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 40,
    },
    button: {
        backgroundColor: "#007AFF",
        color: "white",
        width: 220,
        textAlign: "center",
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 18,
        marginVertical: 10,
    },
});