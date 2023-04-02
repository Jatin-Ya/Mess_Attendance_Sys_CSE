import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ViewBase,
  Pressable,
  Linking,
  Alert,
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
  const [link, setLink] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [currMeal, setCurrMeal] = useState("breakfast");
  const [hostel, setHostel] = useState("BHR");

  const mealtypes = [
    { label: "BHR", value: "BHR" },
    { label: "MHR", value: "MHR" },
  ];

  const getExcelLinkHandler = async () => {
    try {
      console.log("Excel");
      const response = await axios.get("/api/user/getAttendance", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      });
      setLink(response.data.link);
      Alert.alert("Success");
    } catch (err) {
      console.log(err.stack);
      Alert.alert(err.response.data.message);
    }
  };

  const handleLinkPress = () => {
    Linking.openURL(link);
  };

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
      <View>
        {link && (
          <Text
            style={[
              styles.attendanceLink,
              { color: "blue", textDecorationLine: "underline" },
            ]}
            onPress={handleLinkPress}
          >
            {link}
          </Text>
        )}
        {/* {link && <Text style={styles.attendanceLink}>{link}</Text>} */}
        {/* <Button title="Post Review" /> */}
      </View>
      <Pressable onPress={getExcelLinkHandler}>
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
