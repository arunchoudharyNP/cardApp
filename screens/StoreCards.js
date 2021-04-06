import React from "react";
import { Text, View, StyleSheet, Platform, FlatList } from "react-native";
import { useSelector } from "react-redux";

const StoreCards = (props) => {
  const cards = useSelector((state) => state.CardReducer);

  const size = Platform.OS == "web" ? 40 : 15;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.CardContainer}>
        <View style={styles.number}>
          <Text style={{ fontSize: size }}>{item.cardNumber}</Text>
          <View>
            <Text style={{ marginLeft: 20, marginBottom: 10 }}>
              {" "}
              CV Code: {item.CVC}
            </Text>
            <Text style={{ marginLeft: 20 }}>EXP Date: {item.date}</Text>
          </View>
        </View>
        <View style={styles.name}>
          <Text style={{ fontSize: size }}>{item.owner}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      { cards.cards.length >0  ? (
        <FlatList
          data={cards.cards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No card details saved yet. Please add some cards.</Text>
        </View>
      )}
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
  CardContainer: {
    marginHorizontal: Platform.OS == "web" ? "10%" : 20,
    height: 200,
    backgroundColor: "#DFF4F0",
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  number: {
    marginTop: 30,
    flexDirection: "row",
    marginLeft: 20,
  },
  name: {
    marginLeft: 30,
    marginTop: 40,
  },
});

export default StoreCards;
