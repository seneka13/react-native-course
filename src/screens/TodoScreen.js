import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import EditModal from "../components/EditModal";
import { AppButton } from "../components/ui/AppButton";
import AppCard from "../components/ui/AppCard";
import { AppTextBold } from "../components/ui/AppTextBold";
import { THEME } from "../theme";

const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
  const [modal, setModal] = useState(false);

  const saveHandler = (title) => {
    onSave(todo.id, title);
    setModal(false);
  };
  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.btns}>
        <View style={styles.btn}>
          <AppButton color={THEME.GREY_COLOR} onPress={goBack}>
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.btn}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={goBack}
            onPress={onRemove.bind(null, todo.id)}
          >
            <FontAwesome name="remove" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    // width: Dimensions.get("window").width / 3,
    width: Dimensions.get("window").width > 400 ? 150 : 100,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
  title: {
    fontSize: 26,
  },
});

export default TodoScreen;
