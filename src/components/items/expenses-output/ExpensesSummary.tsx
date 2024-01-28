import { StyleSheet, Text, View } from "react-native";
import { Expense } from "../../lib/types";
import { GlobalStyles } from "../../lib/constants";

const ExpensesSummary = ({
  expenses,
  periodName,
}: {
  expenses: Expense[];
  periodName: string;
}) => {
  const sumOfExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${sumOfExpenses.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});

export default ExpensesSummary;
