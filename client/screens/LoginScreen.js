import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import AuthButton from "../components/AuthButton";
import styles from "./Login.module.css";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={require("./../assets/logo.png")} />
      </View>
      <AuthButton style={styles.button} />
      <Text style={styles.tagline}>Tagline</Text>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { background: "#E5E5E5" },
// });

export default LoginScreen;
