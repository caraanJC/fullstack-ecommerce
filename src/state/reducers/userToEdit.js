const initialState = {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_TO_EDIT':
      return action.payload;

    case 'CLEAR_USER_TO_EDIT':
      return initialState;

    default:
      return state;
  }
};

export default reducer;
