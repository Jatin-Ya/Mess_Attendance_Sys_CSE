import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Icon } from '@rneui/base';
import axios from "../utils/axios";

import useAuthContext from "../hooks/useAuthContext";
// import Wrapper from "../utils/Wrapper";
// import COLORS from "../assets/colors/colors";
import LogoutButton from "../components/LogoutButton";
import {
  LoginScreen,
  HomeScreen,
  QRCodeGenerate,
  QRCodeScanner,
  Dashboard,
  ReviewScreen,
  CalenderScreen,
  ReviewScreenAdmin,
} from "../screens";
import { useEffect, useState } from "react";

export default function AppNavigator() {
  const { user } = useAuthContext();
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [role,setRole] = useState("");

  useEffect(()=>{
    if (user){
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false);
    }
  },[user])

  useEffect(()=>{
    const getRole = async ()=> {
      console.log("user data",user.email);
      const res = await axios.post('/api/user/getRole',{
        email : user.email
      });
      setRole(res.data.role)
      console.log(res.data.role)
    }
    if (isLoggedIn){
      getRole()
    }
  },[isLoggedIn]);

  const AuthStack = createNativeStackNavigator();
  const AuthStackNavigator = () => {
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none",
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <AuthStack.Screen
          name="Home"
          component={LoginScreen}
          options={{
            title: "Login Screen",
          }}
        />
        {/* <AuthStack.Screen
          name="Home"
          component={QRCodeGenerate}
          options={{
            title: "Login Screen",
          }}
        /> */}
      </AuthStack.Navigator>
    );
  };

  const MainTabs = createBottomTabNavigator();
  const MainUserTabsNavigator = () => {
    return (
      <MainTabs.Navigator
        sceneContainerStyle={{ backgroundColor: "white" }}
        screenOptions={{
          // tabBarActiveTintColor: COLORS.blue,
          headerRight: LogoutButton,
        }}
      >
        
        <AuthStack.Screen
          name="Review"
          component={ReviewScreen}
          options={{
            title: "Reviews",
          }}
        />
        
        <AuthStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home Screen",
          }}
        />
        <AuthStack.Screen
          name="My QR"
          component={QRCodeGenerate}
          options={{
            title: "My QR Code",
          }}
        />
        
      </MainTabs.Navigator>
    );
  };

  const MainAdminTabsNavigator = () => {
    return (
      <MainTabs.Navigator
        sceneContainerStyle={{ backgroundColor: "white" }}
        screenOptions={{
          // tabBarActiveTintColor: COLORS.blue,
          headerRight: LogoutButton,
        }}
      >
        <AuthStack.Screen
          name="AdminReview"
          component={ReviewScreenAdmin}
          options={{
            title: "Reviews",
          }}
        />
        
        <AuthStack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: "Dashboard",
          }}
        />
        
        <AuthStack.Screen
          name="My QR Scanner"
          component={QRCodeScanner}
          options={{
            title: "My QR Code Scanner",
          }}
        />
        <AuthStack.Screen
          name="Calender Screen"
          component={CalenderScreen}
          options={{
            title: "Calender Screen",
          }}
        />
      </MainTabs.Navigator>
    );
  };

  let content = <AuthStackNavigator />;
  if (isLoggedIn) {
    if (role === "admin")
    content = <MainAdminTabsNavigator />;
    else
    content = <MainUserTabsNavigator />
  }
  // else
  return <NavigationContainer>{content}</NavigationContainer>;
}
