const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
const CLEAR_SEARCH_VALUE = "CLEAR_SEARCH_VALUE";

export const ActionCreators = {
  setSearchValue: payload => ({
    type: SET_SEARCH_VALUE,
    payload
  }),
  clearSearchValue: () => ({
    type:CLEAR_SEARCH_VALUE
  })
};

const setSearchValue = (state, value) => ({
  ...state,
  value,
  disabled: value.trim().length < state.minRequiredChars
});

const clearSearchValue = state => ({
  ...state,
  value: '',
  disabled: state.minRequiredChars > 0
});

export const reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_SEARCH_VALUE:
      return setSearchValue(state, payload);
    case CLEAR_SEARCH_VALUE:
      return clearSearchValue(state);
    default:
      return state;
  }
};
