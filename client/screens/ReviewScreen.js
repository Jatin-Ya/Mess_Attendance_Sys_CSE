import React, { Component, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import Message from "../components/Message";
// import MaterialButtonPrimary1 from "../components/MaterialButtonPrimary1";

function ReviewScreen(props) {
  const [messageArray, setMessageArray] = useState(["abs","gf"]);
  const [newReview,setNewReview] = useState("");

  const onPostReview = () => {
    setMessageArray((a)=>[...a,newReview]);
  }
  console.log(messageArray);
  const messageList = messageArray.map((msgTxt)=>{return <Message text={msgTxt} isMyMessage={false}></Message>})

  return (
    <View style={styles.ReviewContainer}>
      <View style={styles.msgContainer}>
        {messageList}
        <Message text="HI" isMyMessage={true}></Message>
      </View>
      <View style={styles.newReviewContainer}>
        {/* <View style={styles.rect}></View> */}
        <View style={styles.inputContainer}>
          
        <TextInput style={styles.inputReview} value={newReview} onChangeText={setNewReview}></TextInput>
        </View>
        <Button
        title="Post Review"
        onPress={onPostReview}
        ></Button>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  ReviewContainer: {
    flex: 1
  },
  msgContainer:{
    height: "80%"
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

export default ReviewScreen;
