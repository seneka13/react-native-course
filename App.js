import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import AddTodo from "./src/AddTodo";
import { Navbar } from "./src/NavBar";
import Todo from "./src/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (title) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
      },
    ]);
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <View>
      <Navbar title={"Hello REACT NATIVE"} />
      <View style={styles.container}>
        <AddTodo onSubmit={addTodo} />
        <FlatList
          data={todos}
          renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    overflow: "scroll",
  },

  text: {},
});
