const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETUP_POPUP':
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
