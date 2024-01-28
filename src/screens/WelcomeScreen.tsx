import axios from "axios";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/use-redux";
import { FIREBASE_APP_NAME } from "@env";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState<string>("");

  const userToken = useAppSelector((state) => state.authState.token);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
        `https://${FIREBASE_APP_NAME}-default-rtdb.firebaseio.com/message.json?auth=${userToken}`
      );
      setFetchedMessage(response.data);
      } catch (error) {
        Alert.alert(
          "Could not get message!",
          "Please try again later."
        );
      }
    };
    getMessage();
  });

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
