import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";
import testIDs from "./testIDs";
import useAuthContext from "../hooks/useAuthContext";
import axios from "../utils/axios";

export default function AgendaScreen() {
  const { authToken } = useAuthContext();
  const [attendance, setAttendance] = useState([]);
  const [items, setItems] = useState({});

  const getSelfAttendance = async () => {
    try {
      const response = await axios.get("/api/user/attendance-self", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      });

      //   setAttendance(response.data.attendance);
      formatAttendance(response.data.attendance);
      console.log({ at: response.data.attendance });
    } catch (err) {
      console.log(err.stack);
      Alert.alert(err.message);
    }
  };

  //   useEffect(() => {
  //     getSelfAttendance();
  //   }, []);

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };
  const formatAttendance = (attendance) => {
    const newItems = {};

    attendance.forEach((day) => {
      const strTime = timeToString(day.date);
      console.log({ day });

      newItems[strTime] = [];

      Object.keys(day).forEach((key) => {
        if (key !== "date")
          newItems[strTime].push({
            name: day[key],
            day: strTime,
          });
      });
    });
    console.log({ newItems });
    setItems(newItems);
  };

  // const loadItems = (day) => {
  //   const items = this.state.items || {};

  //   setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = this.timeToString(time);

  //       if (!items[strTime]) {
  //         items[strTime] = [];

  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           items[strTime].push({
  //             name: "Item for " + strTime + " #" + j,
  //             height: Math.max(50, Math.floor(Math.random() * 150)),
  //             day: strTime,
  //           });
  //         }
  //       }
  //     }

  //     const newItems = {};
  //     Object.keys(items).forEach((key) => {
  //       newItems[key] = items[key];
  //     });
  //     this.setState({
  //       items: newItems,
  //     });
  //   }, 1000);
  // };

  const renderItem = (reservation) => {
    const fontSize = 14;
    const color = "black";

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={styles.item}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No meals this day!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  //   // reservationsKeyExtractor = (item, index) => {
  //   //   return `${item?.reservation?.day}${index}`;
  //   // };

  return (
    <Agenda
      testID={testIDs.agenda.CONTAINER}
      items={items}
      loadItemsForMonth={getSelfAttendance}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      showClosingKnob={true}
      //   maxDate={timeToString(Date.now())}
      // markingType={'period'}
      // markedDates={{
      //   "2017-05-08": { textColor: "#43515c" },
      //   "2017-05-09": { textColor: "#43515c" },
      //   "2017-05-14": { startingDay: true, endingDay: true, color: "blue" },
      //   "2017-05-21": { startingDay: true, color: "blue" },
      //   "2017-05-22": { endingDay: true, color: "gray" },
      //   "2017-05-24": { startingDay: true, color: "gray" },
      //   "2017-05-25": { color: "gray" },
      //   "2017-05-26": { endingDay: true, color: "gray" },
      // }}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      // hideExtraDays={false}
      // showOnlySelectedDayItems
      // reservationsKeyExtractor={this.reservationsKeyExtractor}
    />
  );

  //   return (
  //     <View>
  //       <Text>Hi</Text>
  //     </View>
  //   );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
