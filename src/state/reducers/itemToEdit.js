const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ITEM_TO_EDIT':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
