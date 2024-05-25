import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import Home from "./src/Components/Home";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    padding: 20,
  },
});
