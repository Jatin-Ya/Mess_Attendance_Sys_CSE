import { View, Text, Image } from "react-native";
import useAuthContext from "../hooks/useAuthContext";
import styles from "./HomeScreen.module.css";

import MenuModal from "../components/MenuModal";
const HomeScreen = () => {
  const { user } = useAuthContext();

  return (
    <MenuModal />
    // <View>
    //   <Text style={styles.heading}>Student Profile</Text>
    //   <Text style={styles.profileName}>{user.name}</Text>
    //   <Text style={[styles.details, { marginBottom: 20 }]}>
    //     {user.email}
    //     {"\n"}
    //     {user.roomNumber}
    //     {","}
    //     {user.hostel}
    //     {"\n"}
    //     {user.email}
    //   </Text>

    //   <Image
    //     source={{
    //       uri: user.picture,
    //     }}
    //     style={styles.profileImage}
    //   />
    //   <View style={[styles.messDueContainer, { marginTop: 40 }]}>
    //     <View style={styles.messDueCard}>
    //       <View style={styles.logoContainer}>
    //         <View style={styles.rect}>
    //           <Image
    //             source={require("./../assets/rupee.png")}
    //             style={[styles.vec, { margin: 12 }]}
    //           />
    //         </View>
    //       </View>
    //       <Text style={styles.amount}>{18000}</Text>
    //       <Text style={styles.messDueTxt}>Mess Due</Text>
    //     </View>
    //   </View>

    //   <View style={styles.box1}>
    //     <Image
    //       style={styles.icon1}
    //       source={require("./../assets/complainEmoji.png")}
    //     />
    //     <Text style={styles.text1}> My Complaints</Text>
    //   </View>

    //   <View style={styles.box2}>
    //     <Image
    //       style={styles.icon2}
    //       source={require("./../assets/Logout.png")}
    //     />
    //     <Text style={styles.text2}> Logout</Text>
    //   </View>

    //   {/* <DisplayToken></DisplayToken> */}
    // </View>
  );
};

export default HomeScreen;
