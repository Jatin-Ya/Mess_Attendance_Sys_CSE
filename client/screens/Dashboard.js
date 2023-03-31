import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import DropDown from "react-native-paper-dropdown";

// import MaterialButtonPrimary from "../components/MaterialButtonPrimary";

function Dashboard() {
  const [mealtype, setMealtype] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [breakfastCount,setBreakfastCount] = useState(0);
  const [lunchCount,setLunchCount] = useState(0);
  const [snacksCount,setSnacksCount] = useState(0);
  const [dinnerCount,setDinnerCount] = useState(0);
  const [date,setDate] = useState(new Date());
  const mealtypes = [{label:"Breakfast",value:"Breakfast"},{label:"Lunch",value:"Lunch"},{label:"Snacks",value:"Snacks"},{label:"Dinner",value:"Dinner"}];
  const onGenerateMeal = () => {
    // console.log(mealtype);
    const meal  = {
      date : date,
      type : mealtype,
      quantity : 0
    }
  }
  const dummyData = {
    breakfast : 20,
    lunch : 40,
    snacks : 30,
    dinner : 50,
    date: "31-03-23"
  }

  useEffect(()=>{
    const currDate = new Date();
    setBreakfastCount(dummyData.breakfast);
    setLunchCount(dummyData.lunch);
    setSnacksCount(dummyData.snacks);
    setDinnerCount(dummyData.dinner);
    setDate(currDate);
  },[])
  return (
    <View style={styles.container}>
      <Text style={styles.dashboard}>Dashboard</Text>
      <View style={styles.detailscontainer}>
      <Text style={styles.datetxt}>Date : {`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`}</Text>
        <Text style={styles.breakfasttxt}>Breakfast : {breakfastCount} people</Text>
        <Text style={styles.lunchtxt}>Lunch : {lunchCount} people</Text>
        <Text style={styles.snackstxt}>Snacks : {snacksCount} people</Text>
        <Text style={styles.dinnertxt}>Dinner : {dinnerCount} people</Text>
      </View>
      <View style={styles.generatecontainer}>
        <Text style={styles.generateANewMealtxt}>Generate a new meal</Text>
        <Text style={styles.selectMealTypetxt}>Select meal type</Text>
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
        {/* <View style={styles.rect3}></View> */}
        {/* <MaterialButtonPrimary
          style={styles.materialButtonPrimary}
        ></MaterialButtonPrimary> */}
        <Button title="Generate Meal" onPress={onGenerateMeal}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:"center"
  },
  dashboard: {
    // fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 22,
    // marginTop: 96,
    // marginLeft: 16
  },
  generatecontainer: {
    width: 341,
    height: 212,
    backgroundColor: "#E6E6E6",
    borderRadius: 15,
    marginTop: 20,
    marginLeft: 16,
  },
  generateANewMealtxt: {
    // fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginTop: 24,
    marginLeft: 26,
  },
  selectMealTypetxt: {
    // fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 18,
    borderRadius: 5,
    marginTop: 19,
    marginLeft: 44,
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

  detailscontainer: {
    width: 341,
    height: 202,
    backgroundColor: "#E6E6E6",
    borderRadius: 15,
    marginTop: 20,
    marginLeft: 16,
  },
  datetxt: {
    // fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 18,
    marginTop: 15,
    marginLeft: 17,
  },
  breakfasttxt: {
    // fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginTop: 12,
    marginLeft: 44,
  },
  lunchtxt: {
    // fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    height: 24,
    width: 270,
    marginTop: 14,
    marginLeft: 44,
  },
  snackstxt: {
    // fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    height: 24,
    width: 270,
    marginTop: 14,
    marginLeft: 44,
  },
  dinnertxt: {
    // fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    width: 270,
    height: 24,
    marginTop: 14,
    marginLeft: 44,
  },
});

export default Dashboard;
