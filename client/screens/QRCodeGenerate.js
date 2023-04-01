import React, { useEffect, useState } from "react";
import { View, Button, Alert, Text, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";
import axios from "../utils/axios";
import useAuthContext from "../hooks/useAuthContext";
import styles from "./QRCodeGenerate.module.css";

const QRCodeGenerate = () => {
  const { user } = useAuthContext();
  const [QRCodeString, setQRCodeString] = useState("");
  const [currentMeal, setCurrentMeal] = useState("Breakfast");

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

  const getCurrentMeal = () => {
    const d = new Date();
    const hour = d.getHours();
    let res = "Breakfast";
    if (hour > 10 && hour < 16) {
      res = "Lunch";
    } else if (hour >= 16 && hour < 19) {
      res = "Snacks";
    } else if (hour >= 19) {
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
      <Text style={[styles.name, { marginBottom: 10 }]}>{user.name}</Text>
      <Image
        style={[styles.icon, { marginLeft: 90, marginBottom: 10 }]}
        source={require(`./../assets/Lunch.png`)}
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
        <Button onPress={generateQRString} title="Generate New QR Code" />
      </View>
    </View>
  );
};

export default QRCodeGenerate;
