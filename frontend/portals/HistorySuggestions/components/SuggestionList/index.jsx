import React from 'react';
import PropTypes from 'prop-types';
import { i18n } from '@shopgate/engage/core';
import { makeStyles } from '@shopgate/engage/styles';
import List from './components/List';
import SearchSuggestion from './components/SearchSuggestion';

const useStyles = makeStyles()(() => ({
  srOnly: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px !important',
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: 1,
    whiteSpace: 'nowrap',
  },
}));

/**
 * The SuggestionList component.
 * @param {Object} props the component props
 * @returns {JSX}
 */
function SuggestionList({
  onClick, suggestions, isPersistentSearchBar,
}) {
  const { classes } = useStyles();

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <>
      <div className={classes.srOnly}>
        {i18n.text('history_announcement')}
      </div>
      <List isPersistentSearchBar={isPersistentSearchBar}>
        {suggestions.map(suggestion =>
          (<SearchSuggestion
            key={suggestion}
            suggestion={suggestion}
            onClick={e => onClick(e, suggestion)}
            isPersistentSearchBar={isPersistentSearchBar}
          />))}
      </List>
    </>
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
