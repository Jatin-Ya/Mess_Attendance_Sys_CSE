import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function AuthButton() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const { login } = useAuthContext();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "659895759042-cos8bhaqckqq0ecdjtgk14ugo5pr1qum.apps.googleusercontent.com",
    expoClientId:
      "659895759042-m6m8f3qik452isp4t160vcilg0mojb1e.apps.googleusercontent.com",
  });

  useEffect(() => {
    console.log({ response });
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      login(response.authentication.accessToken);
      getUserInfo(response.authentication.accessToken);
    }
  }, [response, token]);

  const getUserInfo = async (token) => {
    try {
      const res = await axios.post("http://10.10.28.209:3000/api/auth/login", {
        token,
      });

      console.log({ res });
      // const user = await res.json();
      // console.log({ user });
      setUserInfo(user);
    } catch (error) {
      console.log(error);
      // Add your own error handler here
    }
  };

  const setDummyData = () => {
    const data = {
      email: "dsp13@iitbbs.ac.in",
      _id: "6425de2989d7180f6c218c69",
      name: "Shrirang Deshmukh",
      hostel: "MHR",
      roomNumber: "A-622",
      rollNumber: "19CS01065",
    };

    login(data);
  };

  return (
    <View>
      {userInfo === null ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            // getUserInfo();
            // promptAsync();
            setDummyData();
          }}
        />
      ) : (
        <Text style={styles.text}>{userInfo.name}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
