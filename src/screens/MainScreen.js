import React, { useState, useEffect } from "react";
import { FlatList, Image, StyleSheet, View, Dimensions } from "react-native";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";
import { THEME } from "../theme";

const MainScreen = ({ todos, removeTodo, addTodo, openTodo }) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );
  useEffect(() => {
    const update = () => {
      setDeviceWidth(Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2);
    };
    Dimensions.addEventListener("change", update);
    return () => Dimensions.removeEventListener("change", update);
  });

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />}
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
});

export default MainScreen;
