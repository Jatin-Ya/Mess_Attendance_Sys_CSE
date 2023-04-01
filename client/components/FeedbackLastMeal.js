import {
  View,
  Text,
  Image,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import styles from "./FeedbackLastMeal.module.css";
import axios from "./../utils/axios";
import useAuthContext from "../hooks/useAuthContext";

const FeedbackLastMeal = () => {
  const { authToken } = useAuthContext();
  const [review, setReview] = useState("");

  const [lastMeal, setLastMeal] = useState({ date: "", meal: "" });
  const handleSubmit = () => {
    const comment = review;
    console.log(comment);
    axios
      .post(
        "/api/review",
        {
          mealType: lastMeal.meal,
          date: lastMeal.date,
          review: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("successfully created review");
      })
      .catch((err) => console.log(err));
  };

  const getLastMeal = () => {
    let date = new Date();
    const hours = date.getHours();

    let lastMeal = "dinner";
    if (hours < 7) {
      lastMeal = "dinner";
      date = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    } else if (hours >= 7 && hours < 12) {
      lastMeal = "breakfast";
    } else if (hours >= 12 && hours < 5) {
      lastMeal = "lunch";
    } else if (hours > 5 && hours <= 8) {
      lastMeal = "snacks";
    }

    // let lastMealDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    // let lastMealDate = date.toLocaleDateString("en-Us")
    setLastMeal({ meal: lastMeal, date: date.toISOString() });
  };

  useEffect(() => {
    getLastMeal();
  }, []);

  return (
    <View style={styles.outside_box}>
      <View style={styles.header}>
        <Text style={styles.heading}>Give Review about your last meal!</Text>
      </View>
      <View>
        <Text style={{ fontWeight: 600, marginTop: 10, marginBottom: 10 }}>
          {lastMeal.meal.charAt(0).toUpperCase() + lastMeal.meal.slice(1)} |{" "}
          {lastMeal.date.substring(0, 10)}
        </Text>
      </View>
      <TextInput style={styles.inputBox} onChangeText={setReview} />
      <Pressable onPress={handleSubmit} style={[styles.button]}>
        <View>
          <Text style={styles.buttonText}>Submit</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default FeedbackLastMeal;
