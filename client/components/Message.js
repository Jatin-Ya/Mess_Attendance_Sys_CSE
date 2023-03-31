import { useState } from "react";
import { View, Text } from "react-native";

const Message = (props) => {
  // const { message, isMyMessage } = useState({});

  // return null;
  return (
    <View style={{
      alignSelf: props.isMyMessage ? 'flex-end' : 'flex-start',
      backgroundColor: props.isMyMessage ? '#ADD8E6' : '#ededed',
      padding: 10,
      margin: 10,
      borderRadius: 10,
      width: '70%',
    }}>
      <Text>{props.text}</Text>
    </View>
  )
}

export default Message;