import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";

export default function UsuariosScreen() {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [filtro, setFiltro] = useState("todos");
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const usuariosFiltrados = usuarios.filter((user) =>{
        const coincideBusqueda =
            user.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            user.email.toLowerCase().includes(busqueda.toLowerCase());

            if(filtro === "disponibles") return !user.usado && coincideBusqueda;
            if(filtro === "usados") return user.usado && coincideBusqueda;

            return coincideBusqueda;
    });

    const total = usuarios.length;
    const usados = usuarios.filter((u) => u.usado).length;
    const disponibles = usuarios.filter((u) => !u.usado).length;

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

            <View style={styles.stats}>
                <Text style={styles.statText}>Total: {total}</Text>
                <Text style={styles.statDisponibles}>No usados: {disponibles}</Text>
                <Text style={styles.statUsados}>Usados: {usados}</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Buscar por nombre o email"
                value={busqueda}
                onChangeText={setBusqueda}   
            />

            <View style={styles.filtros}>
                <Text style={[styles.filtroBtn, filtro === "todos" && styles.activo]} onPress={() => setFiltro("todos")}>Todos</Text>
                <Text style={[styles.filtroBtn, filtro === "disponibles" && styles.disponible]} onPress={() => setFiltro("disponibles")}>No usados</Text>
                <Text style={[styles.filtroBtn, filtro === "usados" && styles.usado]} onPress={() => setFiltro("usados")}>Usados</Text>
            </View>

            <FlatList
                data={usuariosFiltrados}
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
    filtros: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 15,
    },
    filtroBtn: {
        fontSize: 14,
        padding: 8,
        backgroundColor: "#eee",
        borderRadius: 8,
    },
    activo: {
        backgroundColor: "#007AAF",
        color: "white",
    },
    disponible: {
        backgroundColor: "green",
        color: "white",
    },
    usado: {
        backgroundColor: "red",
        color: "white",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
    statText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    statDisponibles: {
        fontSize: 16,
        color: "green",
    },
    statUsados: {
        fontSize: 16,
        color: "red",
    },
});