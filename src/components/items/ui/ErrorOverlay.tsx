import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../lib/constants";
import Button from "./Button";

const ErrorOverlay = ({
  message,

}: {
  message: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An eror occurred!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ErrorOverlay;
