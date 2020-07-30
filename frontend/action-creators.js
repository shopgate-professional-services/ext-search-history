import {
  PS_ADD_SEARCH_HISTORY,
  PS_DELETE_SEARCH_HISTORY,
} from './constants';

/**
 * @param {string} searchTerm searchTerm
 * @returns {Object}
 */
export const addSearchHistory = searchTerm => ({
  type: PS_ADD_SEARCH_HISTORY,
  searchTerm,
});

/**
 * @returns {Object}
 */
export const deleteSearchHistory = () => ({
  type: PS_DELETE_SEARCH_HISTORY,
});
