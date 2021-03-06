import { css } from 'glamor';
import { themeConfig } from '@shopgate/engage';
import { isIOSTheme } from '@shopgate-ps/pwa-extension-kit/env/helpers';

const { colors, variables } = themeConfig;
const isIOS = isIOSTheme();

const disabled = css({
  color: colors.shade5,
}).toString();

const selected = css({
  background: colors.shade7,
  boxShadow: `0 -1px 0 0 ${colors.shade7}, 0 1px 0 0 ${colors.shade7}`,
}).toString();

const title = css({
  width: '100%',
  marginTop: 2,
  paddingRight: 16,
  hyphens: 'auto',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
}).toString();

const grid = css({
  alignItems: 'center',
  minHeight: isIOS ? 'auto' : 53,
  padding: `${variables.gap.small}px 0`,
  position: 'relative',
  zIndex: 2,
}).toString();

const image = css({
  alignSelf: 'flex-start',
  flexShrink: 0,
  margin: `0 ${variables.gap.big}px`,
  width: 40,
}).toString();

export default {
  disabled,
  selected,
  title,
  grid,
  image,
};
