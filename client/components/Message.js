import { useState } from "react";
import { View, Text, Image, ScrollView, SafeAreaView, StatusBar } from "react-native";
import styles from "./Message.module.css"
import { StyleSheet } from "react-native";

const Message = (props) => {
  // const { message, isMyMessage } = useState({});

  // return null;
  const getFormatedDate = (datei) => {
    const date = new Date(datei);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }
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
        </View>
        {/* <Text>{props.text}</Text> */}
        </View>
        <SafeAreaView style={styles1.container}>
        <ScrollView style={styles1.scrollView}>
        <Text style={styles1.text}>
          {props.text}
        </Text>
      </ScrollView>
        </SafeAreaView>
      
    </View>
  )
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  scrollView: {
    backgroundColor: 'black',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default Message;