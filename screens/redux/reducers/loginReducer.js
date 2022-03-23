const initialState = {
  userData:{}
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_ID":
      return { userData: action.payload};
    default:
      return state;
  }
};
