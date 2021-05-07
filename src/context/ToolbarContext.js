import createDataContext from "./createDataContext";

const toolbarTypes = {
  SET_TOOL: "SET/TOOL",
  SET_TOOL_ERROR: "SET/POSITIONS_ERROR",
};

const initialState = {
  activeTool: "",
  errorMessage: "",
};

const toolbarReducer = (state, { type, payload }) => {
  switch (type) {
    case toolbarTypes.SET_TOOL:
      return { ...state, activeTool: payload };
    case toolbarTypes.SET_TOOL_ERROR:
      return { ...state, errorMessage: payload };
    default:
      return state;
  }
};

const setTool = (dispatch) => (toolName) => {
  dispatch({
    type: toolbarTypes.SET_TOOL,
    payload: toolName,
  });
};

export const { Context, Provider } = createDataContext(
  toolbarReducer,
  { setTool },
  initialState
);
