import { FlatList, Text } from "react-native";
import { Expense } from "../../lib/types";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }: { expenses: Expense[] }) => {
  const renderExpenseItem = (itemData: { item: Expense }) => {
    return <ExpenseItem {...itemData.item} />;
  };

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;
