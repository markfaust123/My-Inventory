import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Button from "../ui/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppDispatch } from "../../../hooks/use-redux";
import { addItem, updateItem } from "../../../store/items";
import ItemInput from "./ItemInput";
import type { Item } from "../../../types/items-types";
import { Colors } from "../../../constants/styles";

type StateVariable = {
  value: string;
  isValid: boolean;
};

type InputValues = {
  amount: StateVariable;
  date: StateVariable;
  description: StateVariable;
};

const ItemForm = ({
  defaultValues,
  submitButtonLabel,
  onSubmit,
  onCancel,
}: {
  defaultValues: Omit<Item, "id">;
  submitButtonLabel: string;
  onSubmit: (
    itemData: Omit<Item, "id" | "name" | "quantity" | "updatedAt">
  ) => void;
  onCancel: () => void;
}) => {
  const [inputs, setInputs] = useState<InputValues>({
    amount: {
      value: defaultValues ? defaultValues.price.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.createdAt : "",
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
    const itemData: Omit<Item, "id" | "name" | "quantity" | "updatedAt"> = {
      price: +inputs.amount.value,
      createdAt: inputs.date.value,
      description: inputs.description.value,
    };

    const priceIsValid: boolean = !isNaN(itemData.price) && itemData.price > 0;
    const createdAtIsValid: boolean =
      new Date(itemData.createdAt).toString() !== "Invalid Date";
    const descriptionIsValid = itemData.description.trim().length > 0;

    if (!priceIsValid || !createdAtIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: priceIsValid },
          date: { value: currentInputs.date.value, isValid: createdAtIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(itemData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <ItemInput
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: handleInputChanged.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <ItemInput
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
      <ItemInput
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
    color: Colors.error500,
    margin: 8,
  },
});

export default ItemForm;
