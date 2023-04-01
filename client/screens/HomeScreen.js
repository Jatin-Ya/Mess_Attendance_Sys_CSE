import { View, Text, Image } from "react-native";
import useAuthContext from "../hooks/useAuthContext";
import styles from "./HomeScreen.module.css"

const HomeScreen = () => {
  const { user } = useAuthContext();

  return (
    <View>
      <Text style={styles.heading}>Student Profile</Text>
      {/* <Text>Home Screen</Text> */}
      <Text style={styles.profileName}>{user.name}</Text>
      <Text style={styles.details}>{user.email}{'\n'}{user.roomNumber}{','}{user.hostel}{'\n'}{user.email}</Text>
      {/* <Text>Roll Number: {user.rollNumber}</Text>
      <Text>Email: {user.email}</Text>
      <Text>
        Residence: {user.roomNumber}, {user.hostel}
      </Text>
      <Text>Picture: {user.picture}</Text> */}
      <Image
        source={{
          uri: user.picture,
        }}
        style={styles.profileImage}
      />
      <View style={styles.messDueContainer}>
        <View style={styles.messDueCard}>
          <View style={styles.logoContainer}>
            <View style={styles.rect}></View>
          </View>
          <Text style={styles.amount}>{18000}</Text>
          <Text style={styles.messDueTxt}>Mess Due</Text>
        </View>
      </View>
      

      {/* <DisplayToken></DisplayToken> */}
    </View>
  );
};

export default HomeScreen;
