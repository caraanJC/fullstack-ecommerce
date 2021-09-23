const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload;
    case 'EMPTY_USERS':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
