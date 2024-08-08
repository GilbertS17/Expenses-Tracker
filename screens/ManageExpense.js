import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../cosntants/styles";
import IconButton from "../components/UI/IconButton";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const expenseCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    try {
      setIsSubmitting(true);
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
    } catch (error) {
      setError("Could not delete expense");
      setIsSubmitting(false);
    }
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    if (isEditing) {
      try {
        setIsSubmitting(true);
        expenseCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
        navigation.goBack();
      } catch (error) {
        setError("Could not update expense");
        setIsSubmitting(false);
      }
    } else {
      try {
        setIsSubmitting(true);
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense(expenseData);
        navigation.goBack();
      } catch (error) {
        setError("Could not add expense");
        setIsSubmitting(false);
      }
    }
  }

  if (error) {
    return <ErrorOverlay message={error}></ErrorOverlay>;
  }

  if (isSubmitting && !isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: 26,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
