import { createContext, useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  getItemAsync,
  setItemAsync,
  isAvailableAsync,
  deleteItemAsync,
} from "expo-secure-store";
import sleep from "../utils/sleep";

export const MealContext = createContext();

export const MealContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState(null);

  const updateMeal = async (mealId, mealType, mealDate) => {
    try {
      const newMeal = { id: mealId, type: mealType, date: mealDate };
      setItemAsync("meal", JSON.stringify(newMeal));
      setMeal(newMeal);
    } catch (error) {
      Alert.alert("Error", "Failed to store rider credentials on your device");
      setMeal(null);
      throw new Error(error);
    }
  };

  useEffect(() => {
    const getUserFromStorage = async () => {
      await sleep(500);
      try {
        const isSecureStoreAvailable = await isAvailableAsync();
        if (isSecureStoreAvailable) {
          const storedUser = await getItemAsync("meal");
          if (storedUser !== null) {
            setMeal(JSON.parse(storedUser));
          }
        }
        setLoading(false);
      } catch (error) {
        Alert.alert("Login Required", error.status);
        console.log(error);
      }
    };

    getUserFromStorage();
  }, []);

  return (
    <MealContext.Provider
      value={{
        meal,
        updateMeal,
      }}
    >
      {loading && (
        <View style={styles.container}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      )}
      {!loading && children}
    </MealContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    height: 300,
    aspectRatio: 1,
  },
});
