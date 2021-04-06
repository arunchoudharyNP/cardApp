import { ADD_CARD, FETCH_CARD } from "../actions/CardAction";

const initialState = {
  cards: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_CARD:
      return { cards: state.cards.concat(actions.card) };

    case FETCH_CARD:
      return {
        ...state.cards,
        cards: actions.loadCards,
      };
  }

  return state;
};
