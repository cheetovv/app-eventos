import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [estado, setEstado] = useState("");
  const [resultado, setResultado] = useState("");
  const [escanerActivo, setEscanerActivo] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const handleScan = async ({ data }: { data: string }) => {
    if (!escanerActivo || scanned) return;

    setEscanerActivo(false);
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
        if (result.message === "ya_usado") {
          setUsuario(result.usuario);
          setEstado("ya_usado");
        } else {
          setUsuario(null);
          setEstado("no_encontrado");
        }
      }
    } catch (error) {
      setEstado("error")
    }
  };

  const resetScan = () =>{
    setScanned(false);
    setUsuario(null);
    setEstado("");
    setEscanerActivo(false);
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
        <>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            barcodeScannerSettings={{barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleScan}
          />

          <View style={styles.overlay}>
            <View style={styles.scanBox} />
          </View>

          <Text
            style={styles.scanButton}
            onPress={() => setEscanerActivo(true)}
          >
            Escanear
          </Text>
        </>
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

          {estado === "ya_usado" && usuario && (
            <>
              <Text style={styles.warning}>⚠️ Usuario ya ingresó</Text>
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
  scanButton: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 18,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#00FF00",
    borderRadius: 10,
  },
});