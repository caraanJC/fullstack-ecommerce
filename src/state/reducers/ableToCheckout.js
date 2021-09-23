const reducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_ABLE_TO_CHECKOUT':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
