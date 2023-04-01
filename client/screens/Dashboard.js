import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  Image,
  Pressable,
} from "react-native";
import DropDown from "react-native-paper-dropdown";
import axios from "./../utils/axios";
import styles from "./Dashboard.module.css";
import useMealContext from "../hooks/useMealContext";

function Dashboard() {
  const { updateMeal } = useMealContext();

  const [mealtype, setMealtype] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [breakfastCount, setBreakfastCount] = useState(0);
  const [lunchCount, setLunchCount] = useState(0);
  const [snacksCount, setSnacksCount] = useState(0);
  const [dinnerCount, setDinnerCount] = useState(0);
  const [date, setDate] = useState(new Date());
  const mealtypes = [
    { label: "Breakfast", value: "breakfast" },
    { label: "Lunch", value: "lunch" },
    { label: "Snacks", value: "snacks" },
    { label: "Dinner", value: "dinner" },
  ];
  const onGenerateMeal = async () => {
    try {
      const meal = {
        date: date,
        type: mealtype,
        quantity: 0,
        hostel: "MHR",
      };

      console.log(meal);
      const response = await axios.post("/api/meal", meal);
      const newMeal = response.data.newMeal;
      updateMeal(newMeal._id, mealtype, date);
      console.log("Meal created successfully");
    } catch (e) {
      Alert.alert(e.response.data.message);
    }
  };

  useEffect(() => {
    const currDate = new Date();
    setDate(currDate);

    axios
      .get("/api/meal/today-stats")
      .then((response) => {
        setBreakfastCount(response.data.breakfast);
        setLunchCount(response.data.lunch);
        setSnacksCount(response.data.snacks);
        setDinnerCount(response.data.dinner);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <Text style={[styles.date, { marginTop: 10, marginLeft: 10 }]}>
          Date :
          {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}
        </Text>
        <View style={{ marginTop: 20, marginLeft: 10 }}>
          <Text style={styles.txt}>Breakfast : {breakfastCount} people</Text>
          <Text style={styles.txt}>Lunch : {lunchCount} people</Text>
          <Text style={styles.txt}>Snacks : {snacksCount} people</Text>
          <Text style={styles.txt}>Dinner : {dinnerCount} people</Text>
        </View>
      </View>

      <Text style={styles.selectHostel}>Select New Meal Type</Text>
      <View style={styles.selectorinput}>
        <DropDown
          label={"Select"}
          mode={"outlined"}
          value={mealtype}
          setValue={setMealtype}
          list={mealtypes}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
        />
      </View>

      <Pressable onPress={onGenerateMeal}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText1}>Generate New Meal</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
export default Dashboard;
