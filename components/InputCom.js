import React, { useReducer, useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import * as Icon from "@expo/vector-icons";

const INPUT_CHANGE = "INPUT_CHANGE";
const LOST_FOCUS = "LOST_FOCUS";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };

    case LOST_FOCUS:
      return {
        ...state,
        touched: true,
      };

    default:
      return state;
  }
};

const InputCom = (props) => {
  const {
    label,
    errorText,
    secure,
    rightLabel,
    LeftValue,
    email,
    phone,
    number,
    style,
    onInputChanges,
    id,
    mask,
    outerView,
    error,
  } = props;

  const [toggleSecure, setToggleSecure] = useState(false);
  const isSecure = toggleSecure ? false : secure;

  const renderLabel = () => {
    return (
      <View>
        {label ? <Text style={styles.inputTitle}>{label}</Text> : null}
      </View>
    );
  };

  const renderToggle = () => {
    if (!secure) return null;

    return (
      <TouchableOpacity
        style={styles.toggle}
        onPress={() => setToggleSecure(!toggleSecure)}
      >
        {rightLabel ? (
          rightLabel
        ) : (
          <Icon.Ionicons
            color="gray"
            size={30}
            name={toggleSecure ? "md-eye" : "md-eye-off"}
          />
        )}
      </TouchableOpacity>
    );
  };

  const inputStyles = [styles.input, style];

  const inputType = email
    ? "email-address"
    : number
    ? "numeric"
    : phone
    ? "phone-pad"
    : "default";

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  useEffect(() => {
    onInputChanges(id, inputState.value, inputState.isValid);
  }, [onInputChanges, inputState, id]);

  const textChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: LOST_FOCUS });
  };

  return (
    <View style={outerView}>
      {renderLabel()}

      {mask ? (
        <TextInputMask
          type={mask}
          style={inputStyles}
          secureTextEntry={isSecure}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          value={inputState.value}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          placeholderTextColor="grey"
          color="black"
          {...props}
        />
      ) : (
        <TextInput
          type={mask}
          style={inputStyles}
          secureTextEntry={isSecure}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          value={inputState.value}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          placeholderTextColor="grey"
          color="black"
          {...props}
        />
      )}
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}

      {renderToggle()}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderRadius: 50,
    fontSize: 24,
    fontWeight: "500",
    color: "black",
    height: 35,
    borderWidth: 1,
  },
  toggle: {
    position: "absolute",
    alignItems: "flex-end",
    width: 24,
    height: 24,
    top: 11,
    right: 50,
    backgroundColor: "black",
  },

  inputTitle: {
    lineHeight: 18,
    marginVertical: 10,
    fontSize: 17,
    color: "black",
  },
  leftStyle: {
    position: "absolute",
    alignItems: "flex-start",
    width: 24,
    height: 24,
    top: 22,
    left: 50,
  },
  errorContainer: {
    marginTop: 5,
    marginLeft: 50,
  },
  errorText: {
    color: "red",
    fontSize: 11,
    opacity: 0.5,
  },
});

export default InputCom;
