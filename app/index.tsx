import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Home(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Control de Eventos</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/scan")}
            >
                <Text style={styles.buttonText}>Escanear QR</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/historial")}
            >
                <Text style={styles.buttonText}>Ver Historial</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/usuarios")}
            >
                <Text style={styles.buttonText}>Ver Usuarios</Text>
            </TouchableOpacity>        
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
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
});