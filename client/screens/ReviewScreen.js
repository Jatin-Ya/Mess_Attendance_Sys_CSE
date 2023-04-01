import React, { Component, useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View, SafeAreaView } from "react-native";
import Message from "../components/Message";
import DatePicker from "../components/DatePicker";
import DropDown from "react-native-paper-dropdown";
import axios from "../utils/axios";
import useAuthContext from "../hooks/useAuthContext";
import styles from "./ReviewScreen.module.css"
import { useFonts } from "expo-font";
// import MaterialButtonPrimary1 from "../components/MaterialButtonPrimary1";
// MavenPro-VariableFont_wght
function ReviewScreen(props) {
  const { user, authToken } = useAuthContext();
  const [messageArray, setMessageArray] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [mealType, setMealType] = useState("");
  const [date, setDate] = useState(new Date());
  const [reload, setReload] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  let [fontsLoaded] = useFonts({
    "MavenPro-VariableFont_wght": require("../assets/fonts/MavenPro-VariableFont_wght.ttf"),
    
  });
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
  }, [reload]);
  const onChangeDate = (currDate) => {
    setDate(currDate);
  };
  const onPostReview = async () => {
    // console.log({
    //   review: newReview,
    //   date,
    //   mealType,
    // });
    const response = await axios.post(
      "/api/review",
      {
        review: newReview,
        date,
        mealType,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      }
    );
    setReload((r) => !r);
    setMessageArray((a) => [...a, response.data.review]);
    setNewReview("");
  };
  let messageList = (message) => {
    console.log(message);
    // if (message.index==2){return;}
    return (
      <Message
        id={message.item._id}
        text={message.item.review}
        user={message.item.user}
        mealType={message.item.meal.type}
        mealHostel={message.item.meal.hostel}
        time={message.item.createdAt}
        isMyMessage={user.email === message.item.user.email}
      ></Message>
    );}

  return (
    <View style={styles.ReviewContainer}>
      {fontsLoaded&&<Text style={styles.complaintsHeading}>My Complaints</Text>}
      {/* <View style={styles.MessageContainer}> */}
      <SafeAreaView style={styles1.container}>
      <FlatList scrollEnabled={true} data={messageArray} renderItem={messageList} keyExtractor={item=>item._id}></FlatList>
      </SafeAreaView>
      
      {/* </View> */}
      <View style={styles.inputContainer}>
  {/* <TextInput
    multiline={true}
    style={styles.inputReview}
    value={newReview}
    onChangeText={setNewReview}
  ></TextInput> */}
</View>
{/* <DatePicker date={date} setDate={onChangeDate}></DatePicker>
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
<Button title="Post Review" onPress={onPostReview}></Button> */}

      
    </View>
  );
}
// <View style={styles.msgContainer}> */}
// {messageList}
// {/* <Message text="HI" isMyMessage={true}></Message> */}
// </View>
// <View style={styles.newReviewContainer}>
// {/* <View style={styles.rect}></View> */}


// const styles = StyleSheet.create({
//   ReviewContainer: {
//     flex: 1,
//   },
//   msgContainer: {
//     height: "80%",
//   },
//   newReviewContainer: {
//     width: "100%",
//     height: "20%",
//     backgroundColor: "#E6E6E6",
//     borderRadius: 10,
//     justifyContent: "space-around",
//     alignContent: "center",
//     alignItems: "center",
//   },
//   inputContainer: {
//     height: 80,
//     width: "80%",
//     justifyContent: "center",
//     backgroundColor: "rgba(255,255,255,1)",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   inputReview: {
//     width: "90%",
//     height: 64,
//     backgroundColor: "rgba(255,255,255,1)",
//     borderRadius: 0,

//     // marginTop: "5%",
//     // marginLeft: "20%"
//   },
//   materialButtonPrimary1: {
//     height: 36,
//     width: 323,
//     marginTop: 13,
//     marginLeft: 25,
//   },
// });

const styles1 = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 100,
    // alignContent: "center",
    // backgroundColor: 'pink',
    // zIndex : 2000
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default ReviewScreen;
