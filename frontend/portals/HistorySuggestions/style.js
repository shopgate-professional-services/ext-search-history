import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { isIOSTheme } from '@shopgate-ps/pwa-extension-kit/env/helpers';

const isIOS = isIOSTheme();
const { colors } = themeConfig;

export const HEADER_HEIGHT = 56;
export const IOS_SEARCH_HEIGHT = 43;
export const GMD_SEARCH_HEIGHT = 58;

/**
 * Manipulates the css when keyboard is opened to keep the UI scrollable.
 * @param {number} value Keyboard overlap value.
 * @returns {string}
 */
const bottom = value => css({
  paddingBottom: value,
}).toString();

/**
 * @param {boolean} isPersistentSearchBar isPersistentSearchBar
 * @returns {string}
 */
const list = (isPersistentSearchBar) => {
  const additionalHeight = isIOS ? 25 : 0;
  return css({
    fontSize: 16,
    fontWeight: 400,
    bottom: 0,
    position: 'absolute',
    height: '100vh',
    left: 0,
    right: 0,
    top: isPersistentSearchBar ? 0 : `calc(${HEADER_HEIGHT}px + ${additionalHeight}px + ${isIOS ? IOS_SEARCH_HEIGHT : GMD_SEARCH_HEIGHT}px )`,
    backgroundColor: colors.light,
    overflowY: 'scroll',
    zIndex: 3,
    borderTop: '0.5px #cecece solid',
    paddingTop: 5,
  }).toString();
};

export default {
  bottom,
  list,
};
