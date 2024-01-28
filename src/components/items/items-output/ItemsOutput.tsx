import { StyleSheet, View, Text } from "react-native";
import type { Item } from "../../../types/items-types";
import ItemsSummary from "./ItemsSummary";
import { Colors } from "../../../constants/styles";

const ItemsOutput = ({
  items,
  itemsPeriod,
  fallbackText,
}: {
  items: Item[];
  itemsPeriod: string;
  fallbackText: string;
}) => {
  const content =
    items.length > 0 ? (
      <ItemsList items={items} />
    ) : (
      <Text style={styles.infoText}>{fallbackText}</Text>
    );

  return (
    <View style={styles.container}>
      <ItemsSummary items={items} periodName={itemsPeriod} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: Colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

export default ItemsOutput;
