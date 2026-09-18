import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Glow } from '@shopgate/engage/components';
import { makeStyles } from '@shopgate/engage/styles';

const useStyles = makeStyles()(() => ({
  title: {
    width: '100%',
    marginTop: 2,
    paddingRight: 16,
    hyphens: 'auto',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  },
  grid: {
    alignItems: 'center',
    padding: '8px 0',
    position: 'relative',
    zIndex: 2,
    width: '100%',
  },
  button: {
    width: '100%',
    textAlign: 'left',
    verticalAlign: 'bottom',
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

/**
 * The list item component.
 * @returns {JSX.Element}
 */
const Item = ({
  onClick,
  testId,
  title,
  className,
}) => {
  const { classes } = useStyles();

  return (
    <button type="button" className={classes.button} onClick={onClick} data-test-id={testId} aria-label={title}>
      <Glow className={className}>
        <Grid className={classes.grid} component="div">
          <Grid.Item
            className={classes.title}
            component="div"
            grow={1}
          >
            {title}
          </Grid.Item>
        </Grid>
      </Glow>
    </button>
  );
};

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
