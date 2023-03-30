import React, { Component } from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <QRCode value="Hello, World!" size={200} backgroundColor="white" />
      </View>
    );
  }
}
