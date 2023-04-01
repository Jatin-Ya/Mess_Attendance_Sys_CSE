import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from "../utils/axios";

import useAuthContext from "../hooks/useAuthContext";
import { MealContextProvider } from "../contexts/MealContext";
import {
  LoginScreen,
  HomeScreen,
  QRCodeGenerate,
  QRCodeScanner,
  Dashboard,
  ReviewScreen,
  ReviewScreenAdmin,
  Menu,
  Khata,
  RegisterComplaint,
  ExportFromExcel,
  PaidItemQRCodeGenerate,
} from "../screens";
import { useEffect, useState } from "react";

export default function AppNavigator() {
  const { user } = useAuthContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  useEffect(() => {
    const getRole = async () => {
      // console.log("user data", user.email);
      const res = await axios.post("/api/user/getRole", {
        email: user.email,
      });
      setRole(res.data.role);
    };
    if (isLoggedIn) {
      getRole();
    }
  }, [isLoggedIn]);

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
      </AuthStack.Navigator>
    );
  };

  const MainTabs = createNativeStackNavigator();
  const MainUserTabsNavigator = () => {
    return (
      <MainTabs.Navigator
        sceneContainerStyle={{ backgroundColor: "white" }}
        screenOptions={{
          // headerShown: false,
          animation: "none",
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <MainTabs.Screen
          name="homepage"
          component={Menu}
          options={{
            title: "Home",
          }}
        />

        <MainTabs.Screen
          name="profile"
          component={HomeScreen}
          options={{
            title: "User Profile",
          }}
        />

        <MainTabs.Screen
          name="qr"
          component={QRCodeGenerate}
          options={{
            title: "My QR Code",
          }}
        />

        <MainTabs.Screen
          name="khata"
          component={Khata}
          options={{
            title: "Khata",
          }}
        />

        <MainTabs.Screen
          name="reviews"
          component={ReviewScreen}
          options={{
            title: "Reviews",
          }}
        />

        <MainTabs.Screen
          name="add-review"
          component={RegisterComplaint}
          options={{
            title: "Add Review",
          }}
        />
      </MainTabs.Navigator>
    );
  };

  const MainAdminTabs = createBottomTabNavigator();
  const MainAdminTabsNavigator = () => {
    return (
      <MainAdminTabs.Navigator
        sceneContainerStyle={{ backgroundColor: "white" }}
        screenOptions={{
          // headerShown: false,
          animation: "none",
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <MainAdminTabs.Screen
          name="dashboard"
          component={Dashboard}
          options={{
            title: "Dashboard",
          }}
        />

        <MainAdminTabs.Screen
          name="qr-scanner"
          component={QRCodeScanner}
          options={{
            title: "My QR Code Scanner",
          }}
        />
        <MainAdminTabs.Screen
          name="admin-review"
          component={ReviewScreenAdmin}
          options={{
            title: "Reviews",
          }}
        />

        <AuthStack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: "Menu",
          }}
        />

        <AuthStack.Screen
          name="Paid Item"
          component={PaidItemQRCodeGenerate}
          options={{
            title: "Buy Paid Item",
          }}
        />

        <AuthStack.Screen
          name="Add a User"
          component={ExportFromExcel}
          options={{
            title: "Add a User",
          }}
        />
      </MainAdminTabs.Navigator>
    );
  };

  let content = <AuthStackNavigator />;
  if (isLoggedIn) {
    if (role === "admin")
      content = (
        <MealContextProvider>
          <MainAdminTabsNavigator />
        </MealContextProvider>
      );
    else content = <MainUserTabsNavigator />;
  }

  return <NavigationContainer>{content}</NavigationContainer>;
}
