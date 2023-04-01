import { View, Button } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
// import DateTimePickerAndroid

const DatePicker = (props) => {
  // const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  let endDate = new Date();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    props.setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setShow(true);
    setMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const theme = {
    textDayFontFamily: "Arial",
    textMonthFontFamily: "Arial",
    textDayHeaderFontFamily: "Arial",
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
    selectedDayBackgroundColor: "#008080",
    todayTextColor: "#008080",
    dayTextColor: "#333333",
    monthTextColor: "#333333",
    textDisabledColor: "black",
  };

  return (
    <View>
      <Button onPress={showDatepicker} title="Select Date" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={props.date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          maximumDate={endDate}
        />
      )}
    </View>
  );
};

export default DatePicker;
