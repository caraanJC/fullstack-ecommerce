export const login = (user) => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN',
      payload: user,
    });
  };
};
export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export const setUsers = (users) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };
};

export const setItems = (items) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_ITEMS',
      payload: items,
    });
  };
};

export const setOrders = (orders) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_ORDERS',
      payload: orders,
    });
  };
};

export const emptyUsers = () => {
  return (dispatch) => {
    dispatch({
      type: 'EMPTY_USERS',
    });
  };
};

export const setUserToEdit = (user) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER_TO_EDIT',
      payload: user,
    });
  };
};

export const clearUserToEdit = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_USER_TO_EDIT',
    });
  };
};

export const setItemToEdit = (item) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_ITEM_TO_EDIT',
      payload: item,
    });
  };
};

export const setShowLogin = (show) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_SHOW_LOGIN',
      payload: show,
    });
  };
};

export const setupPopup = (setup) => {
  return (dispatch) => {
    dispatch({
      type: 'SETUP_POPUP',
      payload: setup,
    });
  };
};

export const setAbleToCheckout = (checkout) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_ABLE_TO_CHECKOUT',
      payload: checkout,
    });
  };
};
