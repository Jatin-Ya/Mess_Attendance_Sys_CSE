import { Button, View } from "react-native"
import useAuthContext from "../hooks/useAuthContext"

const LogutButton = () => {
  const {logout} = useAuthContext();
  return (
    <View>
      <Button
      title="Logout"
      onPress={logout}
      >
      </Button>
    </View>
  )
}

export default LogutButton;