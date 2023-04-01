import React, { useEffect, useState } from "react";
import { View, Button, Alert, Text, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";
import axios from "../utils/axios";
import useAuthContext from "../hooks/useAuthContext";
import styles from "./QRCodeGenerate.module.css";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
const stylesl = StyleSheet.create({
  customFont: {
    fontFamily: "Courgette-Regular",
    fontSize: 16,
    // fontWeight: "bold",
  },
});

const QRCodeGenerate = () => {
  let [fontsLoaded] = useFonts({
    "NotoSerifTC-Bold": require("../assets/fonts/NotoSerifTC-Bold.otf"),
    "PressStart2P-Regular": require("../assets/fonts/PressStart2P-Regular.ttf"),
    "Courgette-Regular": require("../assets/fonts/Courgette-Regular.ttf"),
  });
  const { user } = useAuthContext();
  const [QRCodeString, setQRCodeString] = useState("");
  const [currentMeal, setCurrentMeal] = useState("");
  const [mealTypeImage, setMealTypeImage] = useState(
    require(`./../assets/Breakfast.png`)
  );

  const generateQRString = async () => {
    try {
      const obj = {
        userId: user._id,
        hostel: user.hostel,
        time: Date.now(),
      };

      const res = await axios.post("/api/encryption/encrypt", { data: obj });
      console.log(res);
      const string = res.data.ciphertext;
      if (!string) {
        throw new Error("Encryption not successful");
      }
      console.log({ cipherString: string });
      setQRCodeString(string);
    } catch (e) {
      // console.log({ e });
      Alert.alert("Error in QR Generation", e.message);
    }
  };

  const formatDate = () => {
    const date = new Date();

    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    return formattedDate;
  };

  const formatName = (name) => {
    const arr = name.split(" ");

    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }

    const res = arr.join(" ");
    return res;
  };

  const getCurrentMeal = () => {
    const d = new Date();
    const hour = d.getHours();
    let res = "Breakfast";
    if (hour > 10 && hour < 16) {
      res = "Lunch";
      setMealTypeImage(require(`./../assets/Lunch.png`));
    } else if (hour >= 16 && hour < 19) {
      res = "Snacks";
      setMealTypeImage(require(`./../assets/Snacks.png`));
    } else if (hour >= 19) {
      setMealTypeImage(require(`./../assets/Dinner.png`));
      res = "Dinner";
    }

    setCurrentMeal(res);

    return res;
  };

  useEffect(() => {
    getCurrentMeal();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        background: "#E5E5E5",
        position: "relative",
        paddingTop: 30,
      }}
    >
      <Text style={[styles.name, { marginBottom: 10 }]}> {formatName(user.name)}</Text>
      <Image
        style={[styles.icon, { marginLeft: 90, marginBottom: 10 }]}
        source={mealTypeImage}
      />
      <Text style={[styles.meal, { marginBottom: 10 }]}>{currentMeal}</Text>
      <Text style={[styles.date, { marginBottom: 10 }]}> {formatDate()}</Text>
      {QRCodeString != "" ? (
        <QRCode
          value={QRCodeString}
          size={200}
          backgroundColor="white"
          style={styles.qr}
        />
      ) : null}
      <Text style={styles.roll}>Student ID: {user.rollNumber}</Text>
      <Text style={styles.tag}>Show this code for mess entry</Text>
      <View style={{ marginTop: 30 }}>
        <Button
          onPress={generateQRString}
          title="Generate New QR Code"
          color="black"
        />
      </View>
    </View>
  );
};

export default QRCodeGenerate;
