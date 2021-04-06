import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Divide = (props) => {
  const { styleLine, styleView, ...restprops } = props;
  return (
    <View style={styleView}>
      <View style={[styles.line, styleLine]} {...restprops}>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: "grey",
    width: "80%",
  },
});

export default Divide;
