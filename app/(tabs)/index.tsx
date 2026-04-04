import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
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
        setResultado("✅ " + result.usuario.nombre);
      } else {
        setResultado("❌ No encontrado");
      }
    } catch (error) {
      setResultado("⚠️ Error de conexión");
    }
  };

  if (!permission) {
    return <Text>Pidiendo permisos...</Text>;
  }

  if (!permission.granted) {
    return <Text>No hay acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleScan}
      />

      <Text style={styles.result}>{resultado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  result: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    fontSize: 20,
    backgroundColor: "white",
    padding: 10,
  },
});