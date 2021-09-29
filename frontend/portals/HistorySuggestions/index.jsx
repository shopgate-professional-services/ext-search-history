import React from 'react';
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
    marginLeft: isIOS || isPersistentSearchBar ? 46 : 72,
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
}) => {
  if (!visible || !searchHistory.length || searchPhrase !== '') {
    return children;
  }

  const isPersistentSearchBar = name === 'persistent-search-bar.search.suggestions.before';

  /**
   * @param {Event} e Event
   * @param {string} searchTerm searchTerm
   */
  const handleClick = (e, searchTerm) => {
    // setTimeout prevents double click while VoiceOver is active
    setTimeout(() => {
      e.currentTarget.value = searchTerm;
      onClick(e, searchTerm);
    }, 0);
  };

  return (
    <div className={classnames(
      { [stylesFile.list(isPersistentSearchBar)]: isIOS || isPersistentSearchBar },
      { [stylesFile.bottom(bottomHeight)]: isIOS || isPersistentSearchBar }
    )}
    >
      <SuggestionList
        suggestions={searchHistory}
        onClick={handleClick}
        isPersistentSearchBar={isPersistentSearchBar}
      />
      <Button
        type="plain"
        className={styles.deleteHistory(isPersistentSearchBar)}
        onClick={deleteSearchHistory}
      >
        <I18n.Text string="ps_search_history.deleteHistory" />
      </Button>
    </div>
  );
};

HistorySuggestions.propTypes = {
  deleteSearchHistory: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  bottomHeight: PropTypes.number,
  children: PropTypes.node,
  searchHistory: PropTypes.arrayOf(PropTypes.string),
  searchPhrase: PropTypes.string,
  visible: PropTypes.bool,
};

HistorySuggestions.defaultProps = {
  children: null,
  searchHistory: null,
  searchPhrase: null,
  bottomHeight: 0,
  visible: true,
};

export default connect(HistorySuggestions);
