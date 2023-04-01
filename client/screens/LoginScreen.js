import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import AuthButton from "../components/AuthButton";
import styles from "./Login.module.css";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("./../assets/logo.png")}  />
      </View>
      <Text style={styles.brandText}>MessKhata</Text>
      <View style={styles.button}>
      <AuthButton  />
      </View>
      
      <Text style={styles.tagline}>Tagline</Text>
    </View>
  );
};


export default LoginScreen;
