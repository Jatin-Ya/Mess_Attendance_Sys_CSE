import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Icon } from '@rneui/base';

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
  Menu,
} from "../screens";

export default function AppNavigator() {
  const { user } = useAuthContext();

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
  const MainTabsNavigator = () => {
    return (
      <MainTabs.Navigator
        sceneContainerStyle={{ backgroundColor: "white" }}
        // screenOptions={{
        //   // tabBarActiveTintColor: COLORS.blue,
        //   headerRight: LogoutButton,
        // }}
      >
        <AuthStack.Screen
          name="AdminReview"
          component={ReviewScreenAdmin}
          options={{
            title: "Reviews",
          }}
        />
        <AuthStack.Screen
          name="Review"
          component={ReviewScreen}
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

        <AuthStack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: "Menu",
          }}
        />
      </MainTabs.Navigator>
    );
  };

  let content = <AuthStackNavigator />;
  if (user) {
    content = <MainTabsNavigator />;
  }

  return <NavigationContainer>{content}</NavigationContainer>;
}
