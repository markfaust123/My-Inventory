import { StyleSheet, View, Text } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../lib/types";
import { GlobalStyles } from "../../lib/constants";

const ExpensesOutput = ({
  expenses,
  expensesPeriod,
  fallbackText,
}: {
  expenses: Expense[];
  expensesPeriod: string;
  fallbackText: string;
}) => {
  const content =
    expenses.length > 0 ? (
      <ExpensesList expenses={expenses} />
    ) : (
      <Text style={styles.infoText}>{fallbackText}</Text>
    );

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

export default ExpensesOutput;
