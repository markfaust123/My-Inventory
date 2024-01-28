import { FlatList } from "react-native";
import type { Item as ItemType } from "../../../types/items-types";
import Item from "./Item";

const ItemsList = ({ items }: { items: ItemType[] }) => {
  const renderItem = (itemData: { item: ItemType }) => {
    return <Item {...itemData.item} />;
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default ItemsList;
