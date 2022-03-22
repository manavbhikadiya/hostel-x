const initialUserId = "";

export const loginReducer = (state = initialUserId, action) => {
  switch (action.type) {
    case "USER_ID":
      return (state = action.payload);
    default:
      return state;
  }
};
