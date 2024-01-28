import { Ionicons } from "@expo/vector-icons";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const IconButton = ({
  icon,
  size,
  color,
  onPress,
}: {
  icon: any;
  size: number;
  color: string | undefined;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default IconButton;
