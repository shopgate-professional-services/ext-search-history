import { persistedReducers } from '@shopgate/engage/core';
import { MAX_HISTORY_LENGTH, PS_ADD_SEARCH_HISTORY, PS_DELETE_SEARCH_HISTORY } from './constants';

persistedReducers.set('extensions.@shopgate-project/search-history/searchHistory');

/**
 * @param {string} searchTerm searchTerm
 * @param {Array} history history
 * @returns {Array}
 */
const add = (searchTerm, history) => {
  const index = history.indexOf(searchTerm);

  // delete searchTerm if already existing
  if (index > -1) {
    history.splice(index, 1);
  }

  history.push(searchTerm);

  if (history.length > MAX_HISTORY_LENGTH) {
    history.shift();
  }

  return history;
};

/**
 * search history reducer.
 * @param {Object} state State.
 * @param {Object} action Action.
 * @returns {Object}
 */
const searchHistoryReducer = (
  state = [],
  action
) => {
  switch (action.type) {
    case PS_ADD_SEARCH_HISTORY:
      return add(action.searchTerm, [...state]);
    case PS_DELETE_SEARCH_HISTORY:
      return [];
    default:
      return state;
  }
};

export default searchHistoryReducer;
