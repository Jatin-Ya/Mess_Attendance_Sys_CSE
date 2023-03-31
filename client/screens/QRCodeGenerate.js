import React, { useState } from "react";
import { View, Button, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import axios from "../utils/axios";
import useAuthContext from "../hooks/useAuthContext";

const QRCodeGenerate = () => {
  const { user } = useAuthContext();
  const [QRCodeString, setQRCodeString] = useState("");

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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {QRCodeString != "" ? (
        <QRCode value={QRCodeString} size={200} backgroundColor="white" />
      ) : null}
      <Button onPress={generateQRString} title="Generate QR Code" />
    </View>
  );
};

export default QRCodeGenerate;
