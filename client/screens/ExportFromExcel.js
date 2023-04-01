import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ViewBase,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import DatePicker from "../components/DatePicker";
import MealButton from "../components/MealButton";
import useAuthContext from "../hooks/useAuthContext";
import axios from "../utils/axios";
import styles from "./ExportFromExcel.module.css";

function ExportFromExcel() {
  const { user, authToken } = useAuthContext();
  const [date, setDate] = useState(new Date());
  const [showDropDown, setShowDropDown] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [currMeal, setCurrMeal] = useState("breakfast");
  const [hostel, setHostel] = useState("BHR");

  const mealtypes = [
    { label: "BHR", value: "BHR" },
    { label: "MHR", value: "MHR" },
  ];

  return (
    <View>
      <Text style={styles.title}>Export from Excel</Text>
      <Text style={styles.date}>Email Address</Text>
      <TextInput
        multiline={true}
        style={styles.inputUserEmail}
        value={newReview}
        onChangeText={setNewReview}
        numberOfLines={4}
        placeholder="20cs01029@iitbbs.ac.in"
        editable={true}
        // textAlignVertical="top"
      ></TextInput>
      <Text style={styles.selectMeal}>Select Start Date</Text>
      <TextInput
        multiline={true}
        style={styles.inputStartDate}
        value={newReview}
        onChangeText={setNewReview}
        numberOfLines={4}
        editable={true}
        placeholder="3-04-23"
        // textAlignVertical="top"
      ></TextInput>

      <Text style={styles.reviewDesp}>Select End Date</Text>
      {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
      <TextInput
        multiline={true}
        style={styles.inputReviewDesp}
        value={newReview}
        onChangeText={setNewReview}
        placeholder="3-04-24"
        numberOfLines={4}
        editable={true}
        // textAlignVertical="top"
      ></TextInput>

      <Text style={styles.selectHostel}>Select Hostel</Text>
      <View style={styles.selectorinput}>
        <DropDown
          label={"Select"}
          mode={"outlined"}
          value={hostel}
          list={mealtypes}
          setValue={setHostel}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
        />
      </View>
      {/* </ScrollView> */}
      {/* <View>
        <Text style={styles.submitButton}>Submit</Text>
        <Button title="Post Review" />
      </View> */}
      <Pressable>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText1}>Export User from Excel</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default ExportFromExcel;
