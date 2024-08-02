import { View, TextInput, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../cosntants/styles";

export default function Input({ label, textInputConfig }) {
  let inputStyles = [styles.textInput];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    color: GlobalStyles.colors.primary100,
    fontSize: 12,
    marginBottom: 4,
  },
  textInput: {
    height: 30,
    minWidth: 200,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
