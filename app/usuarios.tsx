import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UsuariosScreen() {
    const [usuarios, setUsuarios] = useState<any[]>([]);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        try{
            const response = await fetch("http://192.168.0.12:3000/usuarios");
            const data = await response.json();
            setUsuarios(data);
        } catch (error){
            console.log("Error obteniendo usuarios");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Usuarios</Text>

            <FlatList
                data={usuarios}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) =>(
                    <View style={styles.item}>
                       <Text style={styles.nombre}>{item.nombre}</Text>
                       <Text>{item.email}</Text>
                       <Text>
                        {item.usado ? "Usado" : "Disponible"}   
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
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    nombre: {
        fontSize: 16,
        fontWeight: "bold",
    },
});