import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [estado, setEstado] = useState("");
  const [resultado, setResultado] = useState("");

  useEffect(() => {
    requestPermission();
  }, []);

  const handleScan = async ({ data }: { data: string }) => {
    if (scanned) return;

    setScanned(true);

    try {
      const response = await fetch("http://192.168.0.12:3000/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qr_code: data }),
      });

      const result = await response.json();

      if (result.success) {
        setUsuario(result.usuario);
        setEstado("valido");
      } else {
        setUsuario(null);
        setEstado("no_encontrado");
      }
    } catch (error) {
      setEstado("error")
    }
  };

  const resetScan = () =>{
    setScanned(false);
    setUsuario(null);
    setEstado("");
  };

  if (!permission) {
    return <Text>Pidiendo permisos...</Text>;
  }

  if (!permission.granted) {
    return <Text>No hay acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned && (
        <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScan}
        />
      )}

      {scanned && (
        <View style={styles.resultContainer}>
          {estado === "valido" && usuario && (
            <>
              <Text style={styles.success}>✅ Acceso permitido</Text>
              <Text style={styles.text}>👤 {usuario.nombre}</Text>
              <Text style={styles.text}>📧 {usuario.email}</Text>
            </>
          )}

          {estado === "no_encontrado" && (
            <Text style={styles.error}>❌ Usuario no encontrado</Text>
          )}

          {estado === "error" && (
            <Text style={styles.warning}>⚠️ Error de conexión</Text>
          )}

          <Text style={styles.button} onPress={resetScan}>
            🔄 Escanear otra vez
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginTop: 10,
  },
  success: {
    fontSize: 22,
    color: "green",
    fontWeight: "bold",
  },
  error: {
    fontSize: 22,
    color: "red",
    fontWeight: "bold",
  },
  warning: {
    fontSize: 20,
    color: "orange",
  },
  button: {
    marginTop: 30,
    fontSize: 18,
    color: "#007AFF",
  },
});