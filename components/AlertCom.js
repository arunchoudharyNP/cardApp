import { Alert } from "react-native";

const alert = (message) => {
  Alert.alert("Successfully completed", message, [
    { text: "ok", onPress: () => console.log("OK.........") },
  ]);
};

export default alert;
