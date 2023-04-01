import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ViewBase,
  Pressable,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import useAuthContext from "../hooks/useAuthContext";
import axios from "../utils/axios";
import sleep from "../utils/sleep";
import styles from "./PaidItemQRCodeGenerate.module.css";

function PaidItemQRCodeGenerate() {
  const { user, authToken } = useAuthContext();

  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const chargeUserForMeal = async (encryptedString) => {
    try {
      let items = [
        {
          title,
          quantity,
          price,
        },
      ];
      const scanningHostel = "MHR";
      console.log(items);
      const body = {
        encryptedString,
        items,
        scanningHostel,
      };

      const res = await axios.post("/api/user/addPaidMessBalance", body);
      if (res.status === 201) {
        setShowQRScanner(false);
        // sleep(2000);
        Alert.alert("Success!");
      }
    } catch (err) {
      console.error(err);
      console.log(err.response);
      Alert.alert("Error in scanning", err.response);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    chargeUserForMeal(data);
  };

  //   if (hasPermission === null) {
  //     // Alert.alert("Requesting for camera permission");
  //     return <Text>Requesting for camera permission</Text>;
  //   }
  if (hasPermission === false) {
    // Alert.alert("No camera permission");
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <Text style={styles.title}>Item Details</Text>
      <Text style={styles.date}>Name</Text>
      <TextInput
        multiline={true}
        style={styles.inputUserEmail}
        value={title}
        onChangeText={setTitle}
        numberOfLines={4}
        placeholder="Chicken Biryani"
        editable={true}
        // textAlignVertical="top"
      ></TextInput>
      <Text style={styles.selectMeal}>Price</Text>
      <TextInput
        multiline={true}
        style={styles.inputStartDate}
        value={price}
        onChangeText={setPrice}
        placeholder="100"
        keyboardType="numeric"
        editable={true}
        // textAlignVertical="top"
      ></TextInput>

      <Text style={styles.reviewDesp}>Quantity</Text>
      {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
      <TextInput
        multiline={true}
        style={styles.inputReviewDesp}
        value={quantity}
        onChangeText={setQuantity}
        editable={true}
        placeholder="1"
        keyboardType="numeric"
        // textAlignVertical="top"
      ></TextInput>
      <Pressable
        onPress={() => setShowQRScanner(!showQRScanner)}
        disabled={!(title !== "" && quantity > 0 && price > 0)}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText1}>
              {showQRScanner ? "Close Scanner" : "Scan QRCode"}
            </Text>
          </View>
        </View>
      </Pressable>
      {showQRScanner && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ width: "100%", height: "85%", top: "38%" }}
        />
      )}
      {/* {scanned && (
        <Pressable onPress={() => setScanned(false)} style={[styles.button]}>
          <View>
            <Text style={styles.buttonText}>Tap to Scan Again</Text>
          </View>
        </Pressable>
      )} */}
    </View>
  );
}

export default PaidItemQRCodeGenerate;
