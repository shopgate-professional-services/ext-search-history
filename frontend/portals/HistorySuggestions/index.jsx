import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { I18n } from '@shopgate/engage/components';
import { Button } from '@shopgate/engage/components/v2';
import { isIOSTheme } from '@shopgate/engage/core';
import { makeStyles } from '@shopgate/engage/styles';
import { getSearchHistory } from '../../selectors';
import { deleteSearchHistory } from '../../action-creators';
import SuggestionList from './components/SuggestionList';

const isIOS = isIOSTheme();

const HEADER_HEIGHT = 56;
const IOS_SEARCH_HEIGHT = 43;
const GMD_SEARCH_HEIGHT = 58;

const useStyles = makeStyles()((theme, { isPersistentSearchBar, bottomHeight }) => {
  const additionalHeight = isIOS ? 25 : 0;

  return {
    list: {
      fontSize: 16,
      fontWeight: 400,
      bottom: 0,
      position: 'absolute',
      height: '100vh',
      left: 0,
      right: 0,
      top: isPersistentSearchBar
        ? 0
        : `calc(${HEADER_HEIGHT}px + ${additionalHeight}px + ${isIOS ? IOS_SEARCH_HEIGHT : GMD_SEARCH_HEIGHT}px )`,
      backgroundColor: theme.palette.background.surface,
      color: theme.palette.text.primary,
      overflowY: 'scroll',
      zIndex: 3,
      borderTop: `0.5px solid ${theme.components.separatorLine.borderColor}`,
      paddingTop: 5,
    },
    bottom: {
      paddingBottom: bottomHeight,
    },
    deleteHistory: {
      textDecoration: 'underline',
      marginLeft: isIOS || isPersistentSearchBar ? 44 : 72,
      marginTop: 10,
      color: theme.palette.text.secondary,
      fontSize: 14,
      fontWeight: 400,
    },
  };
});

/**
 * @param {Object} props The component props.
 * @return {JSX}
 */
const HistorySuggestions = ({
  onClick,
  searchPhrase,
  children,
  visible,
  bottomHeight,
  name,
  closeSearch,
}) => {
  const dispatch = useDispatch();
  const searchHistory = useSelector(getSearchHistory);
  const isPersistentSearchBar = name === 'persistent-search-bar.search.suggestions.before';
  const { classes, cx } = useStyles({
    isPersistentSearchBar,
    bottomHeight,
  });

  /**
   * @param {Event} e Event
   * @param {string} searchTerm searchTerm
   */
  const handleClick = useCallback((e, searchTerm) => {
    // setTimeout prevents double click while VoiceOver is active
    e.persist();
    e.currentTarget.value = searchTerm;

    setTimeout(() => {
      onClick(e, searchTerm);
    }, 0);
  }, [onClick]);

  const handleDeleteSearchHistory = useCallback(() => {
    // Focus search input after deleting search history
    const input = document.querySelector('input[type="search"], [data-test-id="searchInput"]');

    if (input) {
      input.focus();
    }

    dispatch(deleteSearchHistory());
  }, [dispatch]);

  if (!visible || !searchHistory.length || searchPhrase !== '') {
    return children;
  }

  /* eslint-disable jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions */
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={cx(
        'ext-search-history_history-suggestions-wrapper',
        { [classes.list]: isIOS || isPersistentSearchBar },
        { [classes.bottom]: isIOS || isPersistentSearchBar }
      )}
      onClick={(e) => {
        if (e.target.className.includes('ext-search-history_history-suggestions-wrapper')) {
          if (typeof closeSearch === 'function') {
            // close the search component when whitespace is pressed (needs to be supported by
            // the portal)
            closeSearch();
          }
        }
      }}
    >
      <SuggestionList
        suggestions={searchHistory}
        onClick={handleClick}
        isPersistentSearchBar={isPersistentSearchBar}
      />
      <Button
        variant="link"
        className={classes.deleteHistory}
        onClick={handleDeleteSearchHistory}
      >
        <I18n.Text string="ps_search_history.deleteHistory" />
      </Button>
    </div>
  );

  /* eslint-enable jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions */
};

HistorySuggestions.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  bottomHeight: PropTypes.number,
  children: PropTypes.node,
  closeSearch: PropTypes.func,
  searchPhrase: PropTypes.string,
  visible: PropTypes.bool,
};

HistorySuggestions.defaultProps = {
  children: null,
  closeSearch: null,
  searchPhrase: null,
  bottomHeight: 0,
  visible: true,
};

export default HistorySuggestions;
