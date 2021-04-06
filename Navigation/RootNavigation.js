import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CardInput from "../screens/CardInput";
import StoreCards from "../screens/StoreCards";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RootNavigation = (props) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style: { paddingTop: 20 },
        }}
      >
        <Tab.Screen
          options={{
            title: "Input Card Details",
          }}
          name="CardInput"
          component={CardInput}
        />
        <Tab.Screen
          options={{
            title: "Stored Card Details",
          }}
          name="StoreCards"
          component={StoreCards}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
