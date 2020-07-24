import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';

/**
 * Search suggestion list entry component.
 * @param {Object} props The component props.
 * @param {string} props.suggestion The search suggestion text.
 * @param {Function} props.onClick The action that is triggered on click.
 * @param {boolean} props.isPersistentSearchBar isPersistentSearchBar
 * @returns {JSX}
 */
const SearchSuggestion = ({ suggestion, onClick, isPersistentSearchBar }) => (
  <List.Item
    title={suggestion}
    onClick={onClick}
    isPersistentSearchBar={isPersistentSearchBar}
  />
);

SearchSuggestion.propTypes = {
  isPersistentSearchBar: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  suggestion: PropTypes.string.isRequired,
};

export default SearchSuggestion;
