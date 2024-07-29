import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { isIOSTheme } from '@shopgate-ps/pwa-extension-kit/env/helpers';

const { colors } = themeConfig;
const isIOS = isIOSTheme();

const list = css({
  background: colors.light,
}).toString();

/**
 * @param {boolean} isPersistentSearchBar isPersistentSearchBar
 * @return {string}
 */
const item = isPersistentSearchBar => css({
  paddingLeft: isIOS || isPersistentSearchBar ? 44 : 66,
  fontSize: isIOS || isPersistentSearchBar ? 16 : 14,
  fontWeight: 400,
}).toString();

/**
 * @param {boolean} isPersistentSearchBar isPersistentSearchBar
 * @return {string}
 */
const itemNotLast = isPersistentSearchBar => css({
  boxShadow: isIOS && !isPersistentSearchBar ? 'none' : '0 0px 2px 0px #e8e8e8',
  marginBottom: 1,
}).toString();

/**
 * @param {boolean} isPersistentSearchBar isPersistentSearchBar
 * @return {string}
 */
const innerContainer = css({
  position: 'relative',
}).toString();

const glow = css({
  bottom: -1,
  height: '100%',
  top: -1,
}).toString();

export default {
  list,
  item,
  itemNotLast,
  innerContainer,
  glow,
};
