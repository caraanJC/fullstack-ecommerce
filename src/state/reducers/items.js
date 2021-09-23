const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
