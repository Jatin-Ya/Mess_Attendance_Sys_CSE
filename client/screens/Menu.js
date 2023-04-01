import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";

import axios from "../utils/axios";
import useAuthContext from "../hooks/useAuthContext";
import styles from "./Menu.module.css";

import MenuModal from "../components/MenuModal";

import FeedbackLastMeal from "../components/FeedbackLastMeal";

const Menu = ({ navigation }) => {
  const { user } = useAuthContext();

  const [menu, setMenu] = useState([]);
  const [todaysMenu, setTodaysMenu] = useState([]);
  const [nextMeal, setNextMeal] = useState("");
  const [mealTypeImage, setMealTypeImage] = useState(
    require(`./../assets/Breakfast.png`)
  );

  useEffect(() => {
    axios
      .get("/api/menu/getMenu")
      .then((response) => {
        setMenu(response.data.menu);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getTodaysMenu();
  }, [menu]);

  const getName = () => {
    let ans = user.name;

    ans =
      user.name.charAt(0).toUpperCase() +
      user.name.split(" ")[0].slice(1).toLowerCase();

    return ans;
  };

  const weekDay = () => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const d = new Date();
    //TODO: ADD items in DB
    let day = weekday[d.getDay()];
    // let day = "Monday";
    return day;
  };

  const getCurrentMeal = () => {
    const d = new Date();
    const hour = d.getHours();
    let res = "breakfast";
    setMealTypeImage(require(`./../assets/Breakfast.png`));
    if (hour > 10 && hour < 14) {
      res = "lunch";
      setMealTypeImage(require(`./../assets/Lunch.png`));
    } else if (hour >= 14 && hour < 19) {
      res = "snacks";
      setMealTypeImage(require(`./../assets/Snacks.png`));
    } else if (hour >= 19 && hour < 23) {
      setMealTypeImage(require(`./../assets/Dinner.png`));
      res = "dinner";
    }

    return res;
  };

  const getTodaysMenu = () => {
    const todaysDay = weekDay();
    if (menu.length > 0) {
      const todaysMenu = menu.find((d) => d.day === todaysDay);
      const currentMealTime = getCurrentMeal();
      const newNextMeal = todaysMenu[currentMealTime];
      setNextMeal(newNextMeal);
      setTodaysMenu(todaysMenu);
    }
  };

  const [displayModel, setDisplayModal] = useState(false);
  return (
    <View
      style={{
        background: "#E5E5E5",
      }}
    >
      {displayModel ? (
        <MenuModal setDisplayModal={setDisplayModal} menu={todaysMenu} />
      ) : (
        <View></View>
      )}

      <Text style={styles.welcome}>Welcome {getName()} !</Text>
      <Pressable
        onPress={() => {
          console.log("Rkessed");
          navigation.navigate("profile");
        }}
      >
        <Image
          source={{ uri: user.picture }}
          style={styles.avatar}
          onPress={() => {
            navigation.navigate("profile");
          }}
        />
      </Pressable>
      <View style={styles.rect}>
        <Text style={styles.upcoming}> Upcoming Meal </Text>
        <Image source={mealTypeImage} style={styles.vec} />
        <Text style={styles.items}>{nextMeal}</Text>
        <Image
          source={require("../assets/Khana.png")}
          style={[styles.khana, { resizeMode: "contain" }]}
        />

        <Text
          onPress={() => {
            console.log("Display full menu....");
            setDisplayModal(true);
          }}
          style={styles.fullMenu}
        >
          View Full Menu
        </Text>
        <Image
          onPress={() => {
            console.log("Display full menu icons....");
          }}
          source={require("../assets/arrow.png")}
          style={styles.arrow}
        />
      </View>
      <View>
        <View>
          <SafeAreaView>
            <View style={[{ zIndex: 1000 }, styles.optionBox]}>
              <Pressable
                onPress={() => {
                  console.log("Rkessed");
                  navigation.navigate("qr");
                }}
              >
                <Image
                  source={require("../assets/QR.png")}
                  style={[styles.optionImage, { zIndex: 20000 }]}
                  onPress={() => {
                    console.log("Rkessed");
                    navigation.navigate("qr");
                  }}
                />
              </Pressable>
              <Text style={styles.optionName}>Generate QR</Text>
            </View>
          </SafeAreaView>

          <View style={styles.optionBox2}>
            <Pressable
              onPress={() => {
                console.log("Rkessed");
                navigation.navigate("khata");
              }}
            >
              <Image
                source={require("../assets/Khata.png")}
                style={[styles.optionImage, { left: "25%" }]}
                onPress={() => {
                  console.log("Rkessed");
                  navigation.navigate("khata");
                }}
              />
            </Pressable>
            <Text style={styles.optionName}>Khata</Text>
          </View>

          <View style={styles.optionBox3}>
            <Pressable
              onPress={() => {
                console.log("Rkessed");
                navigation.navigate("add-review");
              }}
            >
              <Image
                source={require("../assets/complain.png")}
                style={[styles.optionImage, { left: "25%" }]}
                onPress={() => {
                  console.log("pRessed");
                  navigation.navigate("add-review");
                }}
              />
            </Pressable>
            <Text style={styles.optionName}>Complain</Text>
          </View>
        </View>
      </View>

      <View style={styles.feedbackForm}>
        <FeedbackLastMeal />
      </View>
    </View>
  );
};

export default Menu;
