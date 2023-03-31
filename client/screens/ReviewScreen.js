import React, { Component, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Message from "../components/Message";
import DatePicker from "../components/DatePicker";
import DropDown from "react-native-paper-dropdown";
import axios from "../utils/axios";
import useAuthContext from "../hooks/useAuthContext";
// import MaterialButtonPrimary1 from "../components/MaterialButtonPrimary1";

function ReviewScreen(props) {
  const { user } = useAuthContext();
  const [messageArray, setMessageArray] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [mealType, setMealType] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDropDown, setShowDropDown] = useState(false);
  const mealTypes = [
    { label: "Breakfast", value: "breakfast" },
    { label: "Lunch", value: "lunch" },
    { label: "Snacks", value: "snacks" },
    { label: "Dinner", value: "dinner" },
  ];
  useEffect(() => {
    const getReviews = async () => {
      const response = await axios.get("/api/review");
      // console.log("Reviews", response.data.reviews);
      setMessageArray(response.data.reviews);
    };
    getReviews();
  }, []);
  const onChangeDate = (currDate) => {
    setDate(currDate);
  };
  const onPostReview = async () => {
    console.log({
      review: newReview,
      date,
      mealType,
    });
    const response = await axios.post("/api/review", {
      review: newReview,
      date,
      mealType,
    });
    // setMessageArray((a) => [...a]);
  };
  let messageList = messageArray.map((message) => {
    return (
      <Message
        text={message.review}
        user={message.user.name}
        mealType={message.meal.type}
        mealHostel={message.meal.hostel}
        time={message.createdAt}
        isMyMessage={user.email === message.user.email}
      ></Message>
    );
  });

  return (
    <View style={styles.ReviewContainer}>
      <View style={styles.msgContainer}>
        {messageList}
        {/* <Message text="HI" isMyMessage={true}></Message> */}
      </View>
      <View style={styles.newReviewContainer}>
        {/* <View style={styles.rect}></View> */}
        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            style={styles.inputReview}
            value={newReview}
            onChangeText={setNewReview}
          ></TextInput>
        </View>
        <DatePicker date={date} setDate={onChangeDate}></DatePicker>
        <View style={styles.selectorinput}>
          <DropDown
            label={"Select"}
            mode={"outlined"}
            value={mealType}
            setValue={setMealType}
            list={mealTypes}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
          />
        </View>
        <Button title="Post Review" onPress={onPostReview}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ReviewContainer: {
    flex: 1,
  },
  msgContainer: {
    height: "80%",
  },
  newReviewContainer: {
    width: "100%",
    height: "20%",
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    height: 80,
    width: "80%",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center",
    borderRadius: 10,
  },
  inputReview: {
    width: "90%",
    height: 64,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 0,

    // marginTop: "5%",
    // marginLeft: "20%"
  },
  materialButtonPrimary1: {
    height: 36,
    width: 323,
    marginTop: 13,
    marginLeft: 25,
  },
});

export default ReviewScreen;
