import { css } from 'glamor';

const srOnly = css({
  border: '0',
  clip: 'rect(0 0 0 0)',
  height: '1px !important',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  width: '1px',
  whiteSpace: 'nowrap',
}).toString();

export default {
  srOnly,
};
