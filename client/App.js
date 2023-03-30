import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthButton from './components/AuthButton';
import DisplayToken from './components/DisplayToken';
import LogutButton from './components/LogoutButton';
import { AuthContextProvider } from './contexts/AuthContext';


export default function App() {
  return (
    <AuthContextProvider>
      <View style={styles.container}>
        <Text>Welcome to the app.</Text>
        <AuthButton></AuthButton>
        <DisplayToken></DisplayToken>
        <LogutButton></LogutButton>
        <StatusBar style='auto' />
      </View>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
