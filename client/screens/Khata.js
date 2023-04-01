import React, { useEffect, useState } from "react";
import {
  Text,
  Alert,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import useAuthContext from "../hooks/useAuthContext";
import styles from "./Khata.module.css";
import axios from "../utils/axios";

const Khata = () => {
  const { user, authToken } = useAuthContext();
  const [selectedDay, setSelectedDay] = useState(null);

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const [attendance, setAttendance] = useState([]);
  const [values, setValues] = useState({
    breakfast: false,
    dinner: false,
    snacks: false,
    lunch: false,
  });

  const getSelfAttendance = async () => {
    try {
      const response = await axios.get("/api/user/attendance-self", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      });

      setAttendance(response.data.attendance);
      console.log({ at: response.data.attendance });
    } catch (err) {
      console.log(err.stack);
      Alert.alert(err.message);
    }
  };

  useEffect(() => {
    getSelfAttendance();
  }, []);

  handleButtonClick = () => {
    if (attendance.length > 0) {
      console.log({ selectedDay });

      const instance = attendance.find(
        (d) => timeToString(d.date) === selectedDay.dateString
      );

      console.log({ instance });

      if (!instance) {
        setValues({
          breakfast: false,
          dinner: false,
          snacks: false,
          lunch: false,
        });
      } else {
        setValues({
          breakfast: instance.breakfast,
          dinner: instance.dinner,
          snacks: instance.snacks,
          lunch: instance.lunch,
        });
      }
    } else {
      console.log("No attendances available");

      setValues({
        breakfast: false,
        dinner: false,
        snacks: false,
        lunch: false,
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <View style={styles.summary}>
          <View
            style={{ flex: 1, position: "relative", top: "5%", left: "3%" }}
          >
            <Text style={styles.messdue}>Your net mess due is</Text>
            <Text style={styles.dueamt}>₹18,000</Text>
            <Text style={styles.duemonth}>₹2,167 used this month</Text>
          </View>
          <Image
            source={require("../assets/khata1.png")}
            style={styles.image}
          />
        </View> */}

        <Text style={styles.monthly}>Your Monthly Breakup</Text>

        <View
          style={{
            position: "absolute",
            width: 240,
            height: 240,
            top: 50,
          }}
        >
          <Calendar
            maxDate={timeToString(Date.now())}
            onDayPress={(day) => {
              setSelectedDay(day);
              handleButtonClick();
              console.log("selected day", day);
            }}
            onDayLongPress={(day) => {
              console.log("selected day", day);
            }}
            monthFormat={"MMMM yyyy"}
            disableMonthChange={true}
            firstDay={1}
            enableSwipeMonths={true}
          />
        </View>

        {selectedDay ? (
          <View style={styles.breakup}>
            <Text style={styles.datestring}>
              Breakdown for {selectedDay.dateString}
            </Text>

            <Text style={styles.mealType}>
              Breakfast: {values.breakfast ? "Yes" : "No"}
            </Text>
            <Text style={styles.mealType}>
              Lunch: {values.lunch ? "Yes" : "No"}
            </Text>
            <Text style={styles.mealType}>
              Snacks: {values.snacks ? "Yes" : "No"}
            </Text>
            <Text style={styles.mealType}>
              Dinner: {values.dinner ? "Yes" : "No"}
            </Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Khata;
