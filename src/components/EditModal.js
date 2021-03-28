import React, { useState } from "react";
import { View, StyleSheet, Button, Modal, TextInput, Alert } from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);
  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert("Error!", `Minimal name length 3 symbol. Current length ${title.trim().length}`);
    } else {
      onSave(title);
    }
  };
  return (
    <Modal animationType="fade" transparent={false} visible={visible}>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          style={styles.input}
          maxLength={64}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Add todo name"
          onChangeText={setTitle}
        />
        <View style={styles.btns}>
          <AppButton onPress={onCancel} color={THEME.DANGER_COLOR}>
            Cancel
          </AppButton>
          <AppButton onPress={saveHandler}>Save</AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
  },

  btns: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default EditModal;
