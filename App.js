import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import ReduxThunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";

import RootNavgation from "./Navigation/RootNavigation";
import CardReducer from "./store/reducers/CardReducer";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  CardReducer: CardReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <RootNavgation>
          <StatusBar style="auto" />
        </RootNavgation>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
