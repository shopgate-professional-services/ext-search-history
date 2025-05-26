import React from 'react';
import PropTypes from 'prop-types';
import { i18n } from '@shopgate/engage/core';
import List from './components/List';
import SearchSuggestion from './components/SearchSuggestion';
import styles from './style';

/**
 * The SuggestionList component.
 * @param {Object} props the component props
 * @returns {JSX}
 */
function SuggestionList({
  onClick, suggestions, isPersistentSearchBar,
}) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <List isPersistentSearchBar={isPersistentSearchBar}>
      <div className={styles.srOnly}>
        {i18n.text('history_announcement')}
      </div>
      {suggestions.map(suggestion =>
        (<SearchSuggestion
          key={suggestion}
          suggestion={suggestion}
          onClick={e => onClick(e, suggestion)}
          isPersistentSearchBar={isPersistentSearchBar}
        />))}
    </List>
  );
}

SuggestionList.propTypes = {
  isPersistentSearchBar: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string),
};

SuggestionList.defaultProps = {
  suggestions: [],
};

export default SuggestionList;
