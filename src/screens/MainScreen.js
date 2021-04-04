import React, { useState, useEffect, useContext, useCallback } from "react";
import { FlatList, Image, StyleSheet, View, Dimensions } from "react-native";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";
import { AppButton } from "../components/ui/AppButton";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";

const MainScreen = () => {
  const { todos, removeTodo, addTodo, fetchTodos, loading, error } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );
  const laodTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);
  useEffect(() => {
    const update = () => {
      setDeviceWidth(Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2);
    };
    Dimensions.addEventListener("change", update);
    return () => Dimensions.removeEventListener("change", update);
  });

  useEffect(() => {
    laodTodos();
  }, []);

  if (loading) {
    return <AppLoader />;
  }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <AppText style={styles.error}>{error}</AppText>
//         <AppButton onPress={laodTodos}>Reload</AppButton>
//       </View>
//     );
//   }

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image style={styles.img} source={require("../../assets/no-items.png")} />
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300,
  },

  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
  },
});

export default MainScreen;
