import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import useAuthContext from "../hooks/useAuthContext";


WebBrowser.maybeCompleteAuthSession();

export default function AuthButton() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const {login} = useAuthContext();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "659895759042-cos8bhaqckqq0ecdjtgk14ugo5pr1qum.apps.googleusercontent.com",
    expoClientId: "659895759042-m6m8f3qik452isp4t160vcilg0mojb1e.apps.googleusercontent.com"

  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      login(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <View>
      {userInfo === null ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
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
