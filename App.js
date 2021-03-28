import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Alert, StyleSheet, View } from "react-native";
import { Navbar } from "./src/components/NavBar";
import MainScreen from "./src/screens/MainScreen";
import TodoScreen from "./src/screens/TodoScreen";
import { THEME } from "./src/theme";

const loadApp = async () => {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: "1",
      title: "React native",
    },
  ]);
  const [todoId, setTodoId] = useState(null);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApp}
        onError={console.log("Error")}
        onFinish={() => setIsReady(true)}
      />
    );
  }
  const addTodo = (title) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
      },
    ]);
  };

  const upadateTodo = (id, title) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
  };

  const removeTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    Alert.alert("Item delete", `Are ypu sure that you want to delete ${todo.title}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTodoId(null);
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        },
      },
    ]);
  };

  let content = (
    <MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={setTodoId} />
  );
  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onSave={upadateTodo}
      />
    );
  }

  return (
    <View>
      <Navbar title={"REACT NATIVE"} />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    overflow: "scroll",
  },
});
