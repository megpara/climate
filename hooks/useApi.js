import { useReducer } from "react";
import { buttonText, errorMessages, successMessages } from "../lib/constants";
import { postData } from "../lib/api-services";
import { validateEmail } from "../lib/utils";

const UPDATE_FIELD = "UPDATE_FIELD";
const UPDATE_ERROR = "UPDATE_ERROR";
const FETCHING = "FETCHING";
const FETCHING_COMPLETE = "FETCHING_COMPLETE";

const MIN_FETCHING_TIME_MS = 2000;

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        [action.name]: action.value,
        buttonText: buttonText.submit,
        error: "",
      };
    case UPDATE_ERROR:
      return { ...state, error: action.error, buttonText: buttonText.error };
    case FETCHING:
      return { ...state, fetching: true, buttonText: buttonText.fetching };
    case FETCHING_COMPLETE:
      return {
        ...state,
        fetching: false,
        buttonText: buttonText.success,
        message: action.message,
      };
    default:
      return state;
  }
};

const initialState = {
  email: "",
  fetching: false,
  error: "",
  message: "",
  buttonText: buttonText.submit,
};

// Generalized version of what was used for the email signup
const useApi = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Probaby don't need this-- unless we still want fields with be stateful
  // Maybe if they are multiple pages?
  const updateField = (name, value) =>
    dispatch({ type: UPDATE_FIELD, name, value });

  const updateError = (error) => dispatch({ type: UPDATE_ERROR, error });

  const post = async (data, route) => {
    return new Promise(async (resolve, reject) => {
      const valid = data.email ? validateEmail(data.email) : true;
      if (valid) {
        const then = new Date();
        dispatch({ type: FETCHING });
        const response = await postData(data, route);
        console.log(response);
        const now = new Date() - then;
        const delay = MIN_FETCHING_TIME_MS - now;
        const isDelayNegative = delay < 0;
        if (response.success) {
          setTimeout(
            () => {
              dispatch({
                type: FETCHING_COMPLETE,
                message: successMessages[response.message],
              });
              resolve();
            },
            isDelayNegative ? 0 : delay
          );
        } else {
          updateError(response.error);
          reject();
        }
      } else {
        updateError(errorMessages.invalidEmail);
        reject();
      }
    });
  };

  return { state, updateField, post };
};

export default useApi;
