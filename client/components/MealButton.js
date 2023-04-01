import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "../screens/RegisterComplain.module.css";

function MealButton({ text, onPress, isCurrent }) {
  return (
    <Pressable
      onPress={() => {
        onPress(text.toLowerCase());
      }}
    >
      <View style={[styles.buttonGroup]}>
        <Text style={[styles.buttonText
        , {color: isCurrent ? "white" : "black" }
        ]}>{text}</Text>
        <View
          style={[
            styles.buttonRectange,
            { backgroundColor: isCurrent ? "black" : "white" },
          ]}
        ></View>
      </View>
    </Pressable>
  );
}

export default MealButton;
