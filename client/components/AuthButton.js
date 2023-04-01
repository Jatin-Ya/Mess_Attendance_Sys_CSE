import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import axios from "../utils/axios";
import useAuthContext from "../hooks/useAuthContext";
import styles from "./AuthButton.module.css"

WebBrowser.maybeCompleteAuthSession();

export default function AuthButton({ style }) {
  const [token, setToken] = useState("");
  // const [userInfo, setUserInfo] = useState(null);
  const { login } = useAuthContext();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "659895759042-cos8bhaqckqq0ecdjtgk14ugo5pr1qum.apps.googleusercontent.com",
    expoClientId:
      "659895759042-m6m8f3qik452isp4t160vcilg0mojb1e.apps.googleusercontent.com",
  });

  useEffect(() => {
    // console.log({ response });
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInformation(response.authentication.accessToken);
    }
  }, [response, token]);

  const getUserInformation = async (token) => {
    try {
      const loginResponse = await axios.post("/api/auth/login", { token });
      console.log(loginResponse.data.user);
      const data = loginResponse.data.user;
      const authToken = loginResponse.data.jwt;

      login(data, authToken);
    } catch (error) {
      console.log(error);
      // Add your own error handler here
    }
  };

  // const getUserInfo = async (token) => {
  //   try {
  //     // console.log('getting data');
  //     // const res = await axios.post("http://10.10.28.209:3000/api/auth/login", {
  //     //   token,
  //     // });
  //     const res = await axios.get(
  //       `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     console.log(res.data);
  //     // .then((res) => {
  //     //   setUserInfo(res.data);
  //     // })
  //     // .catch((err) => console.log(err));
  //     // console.log('Got response');
  //     // console.log({ res });
  //     // const user = await res.json();
  //     // console.log({ user });
  //     setUserInfo(res.data);
  //     login(res.data); // here a call to backend is required to get hotel related details and then add it to res.data object and then send to login function.
  //   } catch (error) {
  //     console.log(error);
  //     // Add your own error handler here
  //   }
  // };

  // const setDummyData = () => {
  //   const data = {
  //     email: "dsp13@iitbbs.ac.in",
  //     _id: "6425de2989d7180f6c218c69",
  //     name: "Shrirang Deshmukh",
  //     hostel: "MHR",
  //     roomNumber: "A-622",
  //     rollNumber: "19CS01065",
  //   };

  //   login(data, "123456789");
  // };

  return (
    <View >
      <Pressable disabled={!request} onPress={()=>{promptAsync()}}>
        <View style={styles.buttonInner}>
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </View>
      </Pressable>
      </View>
      
  );
}
// {/* <Button
//         style={style}
//         title="Sign in with Google"
//         disabled={!request}
//         onPress={() => {
//           promptAsync();
//         }}
//       /> */}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   button: {
//     position: "absolute",
//     left: "0%",
//     right: "0%",
//     top: "0%",
//     bottom: "0%",
//   },
//   link: {
//     // fontFamily: "'Maven Pro'",
//     fontStyle: "normal",
//     fontWeight: "500",
//     fontSize: "12px",
//     lineHeight: "14px",
//     display: "flex",
//     alignItems: "center",
//     textAlign: "center",
//     color: "#FFFFFF",
//   },
// });
