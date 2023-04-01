import { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import styles from './Message.module.css';
import { StyleSheet } from 'react-native';

const Message = (props) => {
  // const { message, isMyMessage } = useState({});

  // return null;
  const getFormatedDate = (datei) => {
    const date = new Date(datei);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  return (
    <View style={styles.messageContainer}>
      <View style={styles.leftCont}>
        <Image
          source={{
            uri: props.user.picture,
          }}
          style={styles.profileImg}
        />
      </View>
      <View style={styles.rightCont}>
        <View style={styles.rightFrame}>
          <Text style={styles.rightHeading}>Review for {props.mealType}</Text>
          <Text style={styles.date}>Date : {getFormatedDate(props.time)}</Text>
          <Text style={styles.date}>Hostel : {props.mealHostel}</Text>
        </View>
      </View>
      {/* <SafeAreaView style={styles1.container}> */}
      {/* <View style={styles1.cont}> */}
      {/* <ScrollView style={styles1.scrollView} > */}
      <View style={styles1.bottomCont}>
        <Text style={styles1.text}>{props.text}</Text>
      </View>

      {/* <Text>jfsg</Text> */}
      {/* </ScrollView> */}
      {/* </View> */}
      {/* </SafeAreaView> */}
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 5,
    // height: 100
    // backgroundColor: 'pink',
    zIndex: 3000,
  },
  cont: {
    height: 80,
  },
  scrollView: {
    // backgroundColor: 'pink',
    // height:20,
    // margin : 10,
    // padding: 10,
    marginHorizontal: 2,
  },
  text: {
    fontSize: 14,
  },
  bottomCont:{
    padding: 15
  }
});

export default Message;
