import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { themeConfig } from '@shopgate/engage';
import { I18n, Button } from '@shopgate/engage/components';
import { isIOSTheme } from '@shopgate-ps/pwa-extension-kit/env/helpers';
import { css } from 'glamor';
import classnames from 'classnames';
import connect from './connector';
import SuggestionList from './components/SuggestionList';
import stylesFile from './style';

const { colors } = themeConfig;
const isIOS = isIOSTheme();

const styles = {
  deleteHistory: isPersistentSearchBar => css({
    textDecoration: 'underline',
    marginLeft: isIOS || isPersistentSearchBar ? 44 : 72,
    marginTop: 10,
    color: colors.shade3,
    fontSize: 14,
  }).toString(),
};
/**
 * @return {JSX}
 */
const HistorySuggestions = ({
  onClick,
  searchHistory,
  searchPhrase,
  children,
  deleteSearchHistory,
  visible,
  bottomHeight,
  name,
  closeSearch,
}) => {
  const isPersistentSearchBar = name === 'persistent-search-bar.search.suggestions.before';

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
    // eslint-disable-next-line no-unused-expressions
    document.querySelector('input[type="search"], [data-test-id="searchInput"]')?.focus();

    deleteSearchHistory();
  }, [deleteSearchHistory]);

  if (!visible || !searchHistory.length || searchPhrase !== '') {
    return children;
  }

  /* eslint-disable jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions */
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={classnames(
        'ext-search-history_history-suggestions-wrapper',
        { [stylesFile.list(isPersistentSearchBar)]: isIOS || isPersistentSearchBar },
        { [stylesFile.bottom(bottomHeight)]: isIOS || isPersistentSearchBar }
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
        type="plain"
        className={styles.deleteHistory(isPersistentSearchBar)}
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
  deleteSearchHistory: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  bottomHeight: PropTypes.number,
  children: PropTypes.node,
  closeSearch: PropTypes.func,
  searchHistory: PropTypes.arrayOf(PropTypes.string),
  searchPhrase: PropTypes.string,
  visible: PropTypes.bool,
};

HistorySuggestions.defaultProps = {
  children: null,
  closeSearch: null,
  searchHistory: null,
  searchPhrase: null,
  bottomHeight: 0,
  visible: true,
};

export default connect(HistorySuggestions);
