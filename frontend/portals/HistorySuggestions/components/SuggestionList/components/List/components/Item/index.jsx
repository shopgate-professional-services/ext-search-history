import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Glow } from '@shopgate/engage/components';
import styles from './style';

/**
 * The list item component.
 * @returns {JSX.Element}
 */
const Item = ({
  onClick,
  testId,
  title,
  className,
}) => (
  <button type="button" className={styles.button} onClick={onClick} data-test-id={testId} aria-label={title}>
    <Glow className={className}>
      <Grid className={styles.grid} component="div">
        <Grid.Item
          className={styles.title}
          component="div"
          grow={1}
        >
          {title}
        </Grid.Item>
      </Grid>
    </Glow>
  </button>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  testId: PropTypes.string,
};

Item.defaultProps = {
  className: null,
  onClick: null,
  testId: null,
};

export default Item;
