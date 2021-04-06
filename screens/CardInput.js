import React, {
  useState,
  useReducer,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import InputCom from "../components/InputCom";
import ButtonCom from "../components/ButtonCom";
import AwesomeAlert from "react-native-awesome-alerts";
import AlertCom from "../components/AlertCom";
import { useDispatch } from "react-redux";
import * as CardActions from "../store/actions/CardAction";

const FORM_INPUT_UPDTAE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDTAE) {
    const updatedValues = {
      ...state.inputValue,
      [action.input]: action.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValidities: updatedValidities,
      inputValue: updatedValues,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const CardInput = (props) => {
  const [error, setError] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [showModal, setshowModal] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchInput] = useReducer(formReducer, {
    inputValue: {
      CardNumber: "",
      owner: "",
      CVC: "",
      date: "",
    },
    inputValidities: {
      CardNumber: false,
      owner: false,
      CVC: false,
      date: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    dispatch(CardActions.fetchCard());
  }, []);

  function useIsMountedRef() {
    const isMountedRef = useRef(null);
    useEffect(() => {
      isMountedRef.current = true;
      return () => (isMountedRef.current = false);
    });
    return isMountedRef;
  }
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    if (isMountedRef.current) {
      if (error) {
        Alert.alert("An ERROR Occoured", error, [{ text: "Okay" }]);
      }
    }
  }, [error, isMountedRef, formState]);

  const inputHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchInput({
        type: FORM_INPUT_UPDTAE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchInput]
  );

  const confirmHandler = () => {
    const card = {
      id: Math.random().toString(),
      cardNumber: formState.inputValue.CardNumber,
      owner: formState.inputValue.owner,
      CVC: formState.inputValue.CVC,
      date: formState.inputValue.date,
    };
    if (card) {
      dispatch(CardActions.addCard(card, props.navigation));

      AlertCom("Card Details saved Successfully");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputForm}>
        <View style={styles.info}>
          <Text style={{ fontSize: 34, alignSelf: "center" }}>
            Payment Details
          </Text>
          <Image
            source={require("../assets/CardsImage.png")}
            style={styles.imageStyle}
          />
        </View>

        <InputCom
          id="CardNumber"
          required
          phone
          minLength={19}
          maxLength={19}
          errorText="Please enter valid card number"
          label="Card Number"
          placeholder="Valid Card Number "
          style={styles.inputFeild}
          outerView={styles.outerView}
          onInputChanges={inputHandler}
          initialValue=""
          initiallyValid={false}
          mask={"credit-card"}
        />

        <View style={styles.rowInput}>
          <InputCom
            id="date"
            required
            phone
            minLength={5}
            maxLength={5}
            errorText="Please enter correct date"
            label="Expiration date"
            placeholder="MM/YY"
            style={styles.inputFeild}
            outerView={styles.outerView}
            onInputChanges={inputHandler}
            initialValue=""
            initiallyValid={false}
            mask={"datetime"}
          />

          <InputCom
            id="CVC"
            required
            phone
            secured
            minLength={3}
            maxLength={3}
            errorText="3 digits code"
            label="CV Code"
            placeholder="CVC"
            style={styles.inputFeild}
            outerView={styles.outerView}
            onInputChanges={inputHandler}
            initialValue=""
            initiallyValid={false}
          />
        </View>

        <InputCom
          id="owner"
          required
          LeftValue="user"
          vectorIcon="AntDesign"
          errorText="Please enter correct username"
          label="Card Owner"
          placeholder="Enter registered user name "
          style={styles.inputFeild}
          outerView={styles.outerView}
          onInputChanges={inputHandler}
          initialValue=""
          initiallyValid={false}
        />
      </View>

      <ButtonCom
        color="green"
        padding={15}
        onPress={() => {
          confirmHandler();
        }}
        disable={!formState.formIsValid}
        style={styles.button}
      >
        <Text style={{ color: "white" }}>Confirm Payment</Text>
      </ButtonCom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Platform.OS == "web" ? "50%" : "100%",
    alignSelf: "center",
    backgroundColor: "white",
  },
  inputFeild: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingLeft: 15,
    paddingVertical: 10,
  },
  outerView: {
    marginHorizontal: Platform.OS == "web" ? "10%" : 20,
    marginBottom: 20,
  },
  info: {
    width: "100%",
    height: 200,
    backgroundColor: "#CFCFCF",
  },
  imageStyle: {
    resizeMode: "stretch",
    width: "100%",
    height: "40%",
    marginTop: 30,
  },
  rowInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginHorizontal: Platform.OS == "web" ? "10%" : 20,
    borderRadius: 5,
    marginTop: 50,
  },
});

export default CardInput;
