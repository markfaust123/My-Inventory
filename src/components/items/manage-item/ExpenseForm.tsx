import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppDispatch } from "../../hooks/use-redux";
import { addExpense, updateExpense } from "../../store/redux/expenses";
import { Expense } from "../../lib/types";
import { GlobalStyles } from "../../lib/constants";

type StateVariable = {
  value: string;
  isValid: boolean;
};

type InputValues = {
  amount: StateVariable;
  date: StateVariable;
  description: StateVariable;
};

const ExpenseForm = ({
  defaultValues,
  submitButtonLabel,
  onSubmit,
  onCancel,
}: {
  defaultValues: Omit<Expense, "id">;
  submitButtonLabel: string;
  onSubmit: (expenseData: Omit<Expense, "id">) => void;
  onCancel: () => void
}) => {
  const [inputs, setInputs] = useState<InputValues>({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const handleInputChanged = (
    inputIdentifier: string,
    enteredValue: string
  ) => {
    setInputs((currentState) => {
      return {
        ...currentState,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const handleConfirm = () => {
    const expenseData: Omit<Expense, "id"> = {
      amount: +inputs.amount.value,
      date: inputs.date.value,
      description: inputs.description.value,
    };

    const amountIsValid: boolean =
      !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid: boolean =
      new Date(expenseData.date).toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: handleInputChanged.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: handleInputChanged.bind(this, "date"),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: true, // default is true
          onChangeText: handleInputChanged.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={handleConfirm} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  }
});

export default ExpenseForm;
