import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../cosntants/styles";

export default function ErrorOverlay({ Message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured</Text>
      <Text style={styles.text}>{Message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
