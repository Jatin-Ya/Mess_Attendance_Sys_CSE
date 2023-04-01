import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

import axios from "../utils/axios";
import useAuthContext from "../hooks/useAuthContext";
import styles from "./Menu.module.css";

function Menu() {
  const { user } = useAuthContext();

  const [menu, setMenu] = useState([]);
  useEffect(() => {
    axios
      .get("/api/menu/getMenu")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View
      style={{
        background: "#E5E5E5",
      }}
    >
      <Text style={styles.welcome}> Welcome {user.name}</Text>
      <View style={styles.rect}>
        <Text style={styles.upcoming}> Upcoming Meal </Text>
        <Image source={require("../assets/meal.png")} style={styles.vec} />
        <Text>Chicken Biryani, Raita, Veg Pulav, Papad, Curry</Text>
        <Image source={require("../assets/Khana.png")} style={styles.khana} />
        <Text style={styles.fullMenu}>View Full Menu</Text>
      </View>

      <View>
        <View style={styles.optionBox}>
          <Image
            source={require("../assets/QR.png")}
            style={styles.optionImage}
          />
          <Text style={styles.optionName}>Generate QR Code</Text>
        </View>
        <View style={styles.optionBox}>
          <Image
            source={require("../assets/Khata.png")}
            style={styles.optionImage}
          />
          <Text style={styles.optionName}>Generate QR Code</Text>
        </View>
        <View style={styles.optionBox}>
          <Image
            source={require("../assets/complain.png")}
            style={styles.optionImage}
          />
          <Text style={styles.optionName}>Generate QR Code</Text>
        </View>
      </View>
    </View>
  );
}

export default Menu;
