import React, { Component, useState } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import Message from "../components/Message";
import DatePicker from "../components/DatePicker";
import DropDown from "react-native-paper-dropdown";
// import MaterialButtonPrimary1 from "../components/MaterialButtonPrimary1";

function ReviewScreenAdmin(props) {
  const [messageArray, setMessageArray] = useState(["abs","gf"]);
  const [newReview,setNewReview] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDropDown, setShowDropDown] = useState(false);

  const onPostReview = () => {
    setMessageArray((a)=>[...a,newReview]);
  }

  const onChangeDate = (currDate) => {
    setDate(currDate);
  }
  console.log(date);
  const messageList = messageArray.map((msgTxt)=>{return <Message text={msgTxt} isMyMessage={false}></Message>})
  const [mealtype, setMealtype] = useState("");
  const mealtypes = [{label:"Breakfast",value:"Breakfast"},{label:"Lunch",value:"Lunch"},{label:"Snacks",value:"Snacks"},{label:"Dinner",value:"Dinner"}];
  return (
    <View style={styles.ReviewContainer}>
      <View style={styles.selectorContainer}>
        
      <DatePicker date={date} setDate={onChangeDate}></DatePicker>
      <Text>Select Meal</Text>
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
      </View>
      <View style={styles.msgContainer}>
        {messageList}
        <Message text="HI" isMyMessage={true}></Message>
      </View>
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
    flex: 1
  },
  selectorContainer: {
    height: "30%"
  },
  msgContainer:{
    height: "70%"
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
    alignItems:"center"
  },
  inputContainer: {
    height: 80,
    width: "80%",
    justifyContent:"center",
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center",
    borderRadius: 10
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
    marginLeft: 25
  }
});

export default ReviewScreenAdmin;
