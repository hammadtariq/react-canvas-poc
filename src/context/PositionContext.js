import createDataContext from "./createDataContext";

const positionTypes = {
  SET_POSITIONS: "SET/POSITIONS",
  SET_POSITIONS_ERROR: "SET/POSITIONS_ERROR",
  CLEAR_ERROR: "CLEAR/ERROR",
};

const initialState = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  errorMessage: "",
};

const positionReducer = (state, { type, payload }) => {
  switch (type) {
    case positionTypes.SET_POSITIONS:
      return { ...state, ...payload };
    case positionTypes.SET_POSITIONS_ERROR:
      return { ...state, errorMessage: payload };
    case positionTypes.CLEAR_ERROR:
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const setPositions = (dispatch) => (position) => {
  dispatch({
    type: positionTypes.SET_POSITIONS,
    payload: position,
  });
};

export const { Context, Provider } = createDataContext(
  positionReducer,
  { setPositions },
  initialState
);
