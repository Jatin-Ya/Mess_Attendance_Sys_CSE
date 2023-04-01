import React, { Component, useState, useEffect } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import Message from "../components/Message";
import DatePicker from "../components/DatePicker";
import DropDown from "react-native-paper-dropdown";
import axios from "../utils/axios";
import useAuthContext from "../hooks/useAuthContext";
// import MaterialButtonPrimary1 from "../components/MaterialButtonPrimary1";

function ReviewScreenAdmin(props) {
  const { user } = useAuthContext();
  const [messageArray, setMessageArray] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [date, setDate] = useState(new Date());
  const [mealType, setMealtype] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  const onChangeDate = (currDate) => {
    setDate(currDate);
  };
  useEffect(() => {
    const getReviews = async () => {
      const response = await axios.get("/api/review");
      // console.log("Reviews", response.data.reviews);
      setMessageArray(response.data.reviews);
    };
    getReviews();
  }, []);
  const messageList =
    (messageArray.length === 0 && <Text>No Review to Show</Text>) ||
    messageArray.map((message) => {
      return (
        message && (
          <Message
            text={message.review}
            user={message.user.name}
            mealType={message.meal.type}
            mealHostel={message.meal.hostel}
            time={message.createdAt}
            isMyMessage={user.email === message.user.email}
          ></Message>
        )
      );
    });
  const mealTypes = [
    { label: "Breakfast", value: "breakfast" },
    { label: "Lunch", value: "lunch" },
    { label: "Snacks", value: "snacks" },
    { label: "Dinner", value: "dinner" },
  ];

  const changeMealHandler = async (value) => {
    setMealtype(value);
    const response = await axios.get(`/api/review/${value}/${date}`);
    console.log("Reviews", response.data.reviews);
    setMessageArray(response.data.reviews);
  };

  return (
    <View style={styles.ReviewContainer}>
      <View style={styles.selectorContainer}>
        <DatePicker date={date} setDate={onChangeDate}></DatePicker>
        <Text>Select Meal</Text>
        <View style={styles.selectorinput}>
          <DropDown
            label={"Select"}
            mode={"outlined"}
            value={mealType}
            setValue={changeMealHandler}
            onChangeText={changeMealHandler}
            list={mealTypes}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
          />
        </View>
      </View>
      <View style={styles.msgContainer}>{messageList}</View>
      {/* <View style={styles.newReviewContainer}> */}
      {/* <View style={styles.rect}></View> */}
      {/* <View style={styles.inputContainer}>
          
        <TextInput multiline={true} style={styles.inputReview} value={newReview} onChangeText={setNewReview}></TextInput>
        </View>
        <Button
        title="Post Review"
        onPress={onPostReview}
        ></Button>
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  ReviewContainer: {
    flex: 1,
  },
  selectorContainer: {
    height: "30%",
  },
  msgContainer: {
    height: "70%",
  },
  selectorinput: {
    width: 300,
    height: 60,
    textAlign: "left",
    borderBottomWidth: 0,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 18,
    marginHorizontal: 5,
    borderRadius: 10,
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

export default ReviewScreenAdmin;
