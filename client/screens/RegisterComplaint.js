import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ViewBase,
  Pressable,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import IconPicker from "../components/IconPicker";
import MealButton from "../components/MealButton";
import useAuthContext from "../hooks/useAuthContext";
import axios from "../utils/axios";
import styles from "./RegisterComplain.module.css";

function RegisterComplaint() {
  const { user, authToken } = useAuthContext();
  const [date, setDate] = useState(new Date());
  const [newReview, setNewReview] = useState("");
  const [currMeal, setCurrMeal] = useState("breakfast");

  const onPressHandler = (mealType) => {
    // console.log("Hello", mealType);
    setCurrMeal(mealType);
  };

  const submitReviewHandler = async () => {
    console.log({
      review: newReview,
      date,
      mealType: currMeal,
    });
    try {
      await axios.post(
        "/api/review",
        {
          review: newReview,
          date,
          mealType: currMeal,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );
    } catch (e) {
      Alert.alert(e.response.data.message);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Review</Text>
      <Text style={styles.date}>Select Date</Text>
      <View style={styles.dateGroup}>
        {/* <Text style={styles.dateText}>Pick a Date</Text> */}
        <View style={styles.dateRectange}>
          <IconPicker date={date} setDate={setDate}/>
          <Text style={styles.showDate}>{date.toLocaleDateString()}</Text>
        </View>
      </View>
      <Text style={styles.selectMeal}>Select Meal</Text>
      {/* <View style={styles.breakfastGroup}>
        <Text style={styles.breakfastText}>Breakfast</Text>
        <View style={styles.breakfastRectange}>
        </View>
      </View> */}
      <View style={styles.mealButton}>
        <MealButton
          text={"BreakFast"}
          isCurrent={currMeal === "breakfast" ? true : false}
          onPress={onPressHandler}
        />
        <MealButton
          text={"Lunch"}
          isCurrent={currMeal === "lunch" ? true : false}
          onPress={onPressHandler}
        />
        <MealButton
          text={"Snacks"}
          isCurrent={currMeal === "snacks" ? true : false}
          onPress={onPressHandler}
        />
        <MealButton
          text={"Dinner"}
          isCurrent={currMeal === "dinner" ? true : false}
          onPress={onPressHandler}
        />
      </View>
      <Text style={styles.reviewDesp}>Description</Text>
      {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
      <TextInput
        multiline={true}
        style={styles.inputReviewDesp}
        value={newReview}
        onChangeText={setNewReview}
        numberOfLines={4}
        editable={true}
        // textAlignVertical="top"
      ></TextInput>
      {/* </ScrollView> */}
      {/* <View>
        <Text style={styles.submitButton}>Submit</Text>
        <Button title="Post Review" />
      </View> */}
      <Pressable onPress={submitReviewHandler}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText1}>Post a Review</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default RegisterComplaint;
