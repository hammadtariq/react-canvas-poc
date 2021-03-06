import createDataContext from "./createDataContext";
import { categories } from "./data/categories";

const categoryTypes = {
  SET_CATEGORY: "SET/CATEGORY",
  ADD_CATEGORY: "ADD/CATEGORY",
  UPDATE_CATEGORIES: "UPDATE/CATEGORY",
  CLEAR_ERROR: "CLEAR/ERROR",
};

const initialState = {
  categories,
  activeCategory: {},
  errorMessage: "",
};

const positionReducer = (state, { type, payload }) => {
  switch (type) {
    case categoryTypes.SET_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === payload
            ? { ...c, isActive: true }
            : { ...c, isActive: false }
        ),
        activeCategory: state.categories.find((c) => c.id === payload),
      };
    case categoryTypes.ADD_CATEGORY:
      return { ...state, categories: state.categories.concat(payload) };
    case categoryTypes.UPDATE_CATEGORIES:
      return { ...state, categories: payload };
    case categoryTypes.CLEAR_ERROR:
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const addCategory = (dispatch) => (newCategory) => {
  dispatch({
    type: categoryTypes.ADD_CATEGORY,
    payload: newCategory,
  });
};

const setCategory = (dispatch) => (categoryId) => {
  dispatch({
    type: categoryTypes.SET_CATEGORY,
    payload: categoryId,
  });
};

const updateCategories = (dispatch) => (updatedCategories) => {
  dispatch({
    type: categoryTypes.UPDATE_CATEGORIES,
    payload: updatedCategories,
  });
};

export const { Context, Provider } = createDataContext(
  positionReducer,
  { addCategory, setCategory, updateCategories },
  initialState
);
