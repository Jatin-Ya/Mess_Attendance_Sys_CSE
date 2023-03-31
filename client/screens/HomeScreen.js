import { View, Text, Image } from "react-native";
import useAuthContext from "../hooks/useAuthContext";

const HomeScreen = () => {
  const { user } = useAuthContext();

  return (
    <View>
      <Text>Home Screen</Text>
      <Text>Name: {user.name}</Text>
      <Text>Roll Number: {user.rollNumber}</Text>
      <Text>Email: {user.email}</Text>
      <Text>
        Residence: {user.roomNumber}, {user.hostel}
      </Text>
      <Text>Picture: {user.picture}</Text>
      <Image
        source={{
          uri: user.picture,
        }}
      />

      {/* <DisplayToken></DisplayToken> */}
    </View>
  );
};

export default HomeScreen;
