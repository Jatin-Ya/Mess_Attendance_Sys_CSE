import { View,Text } from "react-native";
import useAuthContext from "../hooks/useAuthContext"

const DisplayToken = () => {
  const {user} = useAuthContext();
  return (
    <View>
      {user?<Text>{user}</Text>:<Text>Not in storage</Text>}
    </View>
  )
}

export default DisplayToken;