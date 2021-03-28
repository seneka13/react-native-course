import React, { useState } from "react";
import { StyleSheet, View, TextInput, Alert, Keyboard } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../theme";

export default function AddTodo({ onSubmit }) {
  const [value, setValue] = useState("");
  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("You need to write todo");
    }
  };
  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Add todo text..."
        autoCorrect
        autoCapitalize="none"
        // keyboardType="web-search"
      />
      <AntDesign.Button name="pluscircleo" size={24} color="white" onPress={pressHandler}>
        Add Todo
      </AntDesign.Button>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    width: "60%",
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
});
