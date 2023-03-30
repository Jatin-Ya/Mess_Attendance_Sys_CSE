import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Icon } from '@rneui/base';

import useAuthContext from '../hooks/useAuthContext';
// import Wrapper from "../utils/Wrapper";
// import COLORS from "../assets/colors/colors";
import LogoutButton from '../components/LogoutButton';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeSreen';

export default function AppNavigator() {
  const { user } = useAuthContext();

  const AuthStack = createNativeStackNavigator();
  const AuthStackNavigator = () => {
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
          contentStyle: {
            backgroundColor: 'white',
          },
        }}
      >
        <AuthStack.Screen
          name='Home'
          component={LoginScreen}
          options={{
            title: 'Login Screen',
          }}
        />
      </AuthStack.Navigator>
    );
  };

  const MainTabs = createBottomTabNavigator();
  const MainTabsNavigator = () => {
    return (
      <MainTabs.Navigator
        sceneContainerStyle={{ backgroundColor: 'white' }}
        screenOptions={{
          // tabBarActiveTintColor: COLORS.blue,
          headerRight: LogoutButton,
        }}
      >
        <AuthStack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Home Screen',
          }}
        />
      </MainTabs.Navigator>
    );
  };

  let content = <AuthStackNavigator />;
  // if (user) {
  //   content = <MainTabsNavigator />;
  // }

  return <NavigationContainer>{content}</NavigationContainer>;
}
