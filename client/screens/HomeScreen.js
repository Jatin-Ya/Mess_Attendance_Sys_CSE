import { View, Text, Image, TouchableOpacity } from "react-native";
import useAuthContext from "../hooks/useAuthContext";
import styles from "./HomeScreen.module.css";

//TODO: ADD Navigation

const HomeScreen = () => {
  const { user, logout } = useAuthContext();

  return (
    <View>
      <Text style={styles.heading}>Student Profile</Text>
      <Text style={styles.profileName}>{user.name}</Text>
      <Text style={[styles.details, { marginBottom: 10 }]}>
        {user.email}
        {"\n\n"}
        {user.roomNumber}
        {","}
        {user.hostel}
        {"\n\n"}
        {user.email}
      </Text>

      <Image
        source={{
          uri: user.picture,
        }}
        style={styles.profileImage}
      />
      <View style={[styles.messDueContainer, { marginTop: 80 }]}>
        <View style={styles.messDueCard}>
          <View style={styles.logoContainer}>
            <View style={styles.rect}>
              <Image
                source={require("./../assets/rupee.png")}
                style={[styles.vec, { margin: 12 }]}
              />
            </View>
          </View>
          <Text style={styles.amount}>{18000}</Text>
          <Text style={styles.messDueTxt}>Mess Due</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.box1}
        onPress={() => {
          console.log("Pressed Complaints");
        }}
      >
        <Image
          style={styles.icon1}
          source={require("./../assets/complainEmoji.png")}
        />
        <Text style={styles.text1}>My Complaints</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box2} onPress={logout}>
        <Image
          style={styles.icon2}
          source={require("./../assets/Logout.png")}
        />
        <Text style={styles.text2}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
