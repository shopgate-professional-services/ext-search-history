import { css } from 'glamor';
import { themeConfig } from '@shopgate/engage';

const { variables } = themeConfig;

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
  padding: `${variables.gap.small}px 0`,
  position: 'relative',
  zIndex: 2,
  width: '100%',
}).toString();

const button = css({
  width: '100%',
  textAlign: 'left',
  verticalAlign: 'bottom',
  paddingLeft: 0,
  paddingRight: 0,
}).toString();

export default {
  title,
  grid,
  button,
};
