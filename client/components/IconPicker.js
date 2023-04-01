import React, { useState } from "react";
import { View, Button, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";

const IconPicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showPicker, setShowPicker] = useState(false);
  const [show, setShow] = useState(false);

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  // const handleDateTimePicker = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShowPicker(Platform.OS === "ios");
  //   setDate(currentDate);
  // };
  let endDate = new Date();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowPicker(false);
    props.setDate(currentDate);
  };
  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={props.date}
        mode={mode}
        is24Hour={true}
        onChange={onChange}
        maximumDate={endDate}
      />
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={showDateTimePicker}>
        <View style={{ textCenter:"center", alignItems: "center" }}>
          <Icon name="calendar" size={33} color="white" />
        </View>
      </TouchableOpacity>
      {showPicker && renderDatePicker()}
    </View>
  );
};

export default IconPicker;
