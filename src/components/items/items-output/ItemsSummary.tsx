import { StyleSheet, Text, View } from "react-native";
import type { Item } from "../../../types/items-types";
import { Colors } from "../../../constants/styles";

const ItemsSummary = ({
  items,
  periodName,
}: {
  items: Item[];
  periodName: string;
}) => {
  const sumOfItems = items.reduce(
    (sum, item) => sum + item.price,
    0
  );
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${sumOfItems.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: Colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary500,
  },
});

export default ItemsSummary;
