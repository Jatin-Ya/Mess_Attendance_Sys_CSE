import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import AuthButton from './components/AuthButton';
import DisplayToken from './components/DisplayToken';
import LogutButton from './components/LogoutButton';
import { AuthContextProvider } from './contexts/AuthContext';
import AppNavigator from './navigation';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <AuthContextProvider>
      {/* <View style={styles.container}>
        <Text>Welcome to the app.</Text>
        <AuthButton></AuthButton>
        <DisplayToken></DisplayToken>
        <LogutButton></LogutButton>
        <StatusBar style='auto' />
      </View> */}
      <SafeAreaView style={styles.container}>
        <PaperProvider>
          <AppNavigator />
          </PaperProvider>
      </SafeAreaView>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    fontFamily: "Roboto",
  },
});
