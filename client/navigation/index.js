import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
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
  WeeklyMenu,
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
          name="weekly-menu"
          component={WeeklyMenu}
          options={{
            title: "Weekly Menu",
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
            tabBarIcon: () => (
              <AntDesign name="dashboard" size={24} color="black" />
            ),
          }}
        />

        <MainAdminTabs.Screen
          name="qr-scanner"
          component={QRCodeScanner}
          options={{
            title: "My QR Code Scanner",
            tabBarIcon: () => (
              <AntDesign name="qrcode" size={24} color="black" />
            ),
          }}
        />
        <MainAdminTabs.Screen
          name="admin-review"
          component={ReviewScreenAdmin}
          options={{
            title: "Reviews",
            tabBarIcon: () => (
              <AntDesign name="folderopen" size={24} color="black" />
            ),
          }}
        />

        <MainAdminTabs.Screen
          name="Menu"
          component={Menu}
          options={{
            title: "Menu",
          }}
        />

        <MainAdminTabs.Screen
          name="Paid Item"
          component={PaidItemQRCodeGenerate}
          options={{
            title: "Paid Item",
          }}
        />

        <MainAdminTabs.Screen
          name="Add a User"
          component={ExportFromExcel}
          options={{
            title: "Report",
            tabBarIcon: () => (
              <FontAwesome name="file-excel-o" size={24} color="black" />
            ),
          }}
        />
      </MainAdminTabs.Navigator>
    );
  };

  let content = <AuthStackNavigator />;
  if (user && isLoggedIn) {
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
