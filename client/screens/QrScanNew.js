import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  Image,
  Pressable,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "../utils/axios";
import useMealContext from "../hooks/useMealContext";
import styles from "./QRCodeGenerate.module.css";

export default function QRCodeScanner() {
  const { meal } = useMealContext();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [mealTypeImage, setMealTypeImage] = useState(
    require(`./../assets/Breakfast.png`)
  );

  // const meal = {
  //   type: "dinner",
  //   date: new Date(),
  //   id: "dgfghjk",
  // };
  const getCurrentMeal = () => {
    if (meal.type === "lunch") {
      setMealTypeImage(require(`./../assets/Lunch.png`));
    } else if (meal.type === "snacks") {
      setMealTypeImage(require(`./../assets/Snacks.png`));
    } else if (meal.type === "dinner") {
      setMealTypeImage(require(`./../assets/Dinner.png`));
    }
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
    getCurrentMeal();
  }, []);

  const chargeUserForMeal = async (encryptedString) => {
    try {
      const mealId = "642691dc08b00fad3c1b90a6" || meal.id;
      const scanningHostel = "MHR";

      const body = {
        encryptedString,
        mealId,
        scanningHostel,
      };

      const res = await axios.post("/api/user/demo", body);
      console.log({ res });
      if (res.status === 201) {
        Alert.alert("Success!");
      }
    } catch (err) {
      console.error(err);
      console.log(err.response?.data?.message);
      Alert.alert("Error in scanning", err.response.data.message);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    chargeUserForMeal(data);
  };

  if (hasPermission === null) {
    // Alert.alert("Requesting for camera permission");
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    // Alert.alert("No camera permission");
    return <Text>No access to camera</Text>;
  }

  if (!meal || !meal.id) {
    Alert.alert("Error", "Something went wrong no meal present");
    return;
  }

  const formatDate = (d) => {
    if (!d) {
      return "";
    }

    const date = new Date(d);
    console.log(date);
    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    return formattedDate;
  };

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
      <Text style={[styles.name, { marginBottom: 10 }]}>MHR</Text>
      <Image
        style={[styles.icon, { marginLeft: 90, marginBottom: 10 }]}
        source={mealTypeImage}
      />
      <Text style={[styles.meal, { marginBottom: 10 }]}>{meal?.type}</Text>
      <Text style={[styles.date, { marginBottom: 10 }]}>
        {formatDate(meal?.date)}
      </Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ width: "100%", height: "60%" }}
      />
      {scanned && (
        <Pressable onPress={() => setScanned(false)} style={[styles.button]}>
          <View>
            <Text style={styles.buttonText}>Tap to Scan Again</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}
