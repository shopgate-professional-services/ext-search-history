import { createSelector } from 'reselect';

const REDUCER_KEY = '@shopgate-project/search-history/searchHistory';

/**
 * Gets extensions state
 * @param {Object} state State.
 * @returns {Object}
 */
export const getExtensionsState = (state) => {
  if (!state.extensions[REDUCER_KEY]) {
    return {};
  }
  return state.extensions[REDUCER_KEY];
};

export const getSearchHistory = createSelector(
  getExtensionsState,
  (history) => {
    if (!history) {
      return null;
    }

    return history.reverse();
  }
);
