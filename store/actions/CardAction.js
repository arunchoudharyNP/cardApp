export const ADD_CARD = "ADD_CARD";
export const FETCH_CARD = "FETCH_CARD";

export const addCard = (card, navigation) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://testcard-fae17-default-rtdb.firebaseio.com/Cards.json`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          id: card.id,
          cardNumber: card.cardNumber,
          owner: card.owner,
          CVC: card.CVC,
          date: card.date,
        }),
      }
    );

    const resData = await response.json();

    // console.log(resData);
    await dispatch({
      type: ADD_CARD,
      card,
    });

    navigation.navigate("StoreCards");
  };
};

export const fetchCard = () => {
  return async (dispatch) => {
    const response = await fetch(
      `https://testcard-fae17-default-rtdb.firebaseio.com/Cards.json`
    );
    const resData = await response.json();

    const loadCards = [];

    for (const key in resData) {
      loadCards.push({
        id: resData[key].id,
        cardNumber: resData[key].cardNumber,
        CVC: resData[key].CVC,
        owner: resData[key].owner,
        date: resData[key].date,
      });
    }
    console.log(" my Cards.............." + JSON.stringify(loadCards));

    dispatch({ type: FETCH_CARD, loadCards });
  };
};
