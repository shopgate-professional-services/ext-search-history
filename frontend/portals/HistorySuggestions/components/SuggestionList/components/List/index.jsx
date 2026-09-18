import React from 'react';
import PropTypes from 'prop-types';
import { List as BaseList } from '@shopgate/engage/components';
import { isIOSTheme } from '@shopgate/engage/core';
import { makeStyles } from '@shopgate/engage/styles';
import Item from './components/Item';

const isIOS = isIOSTheme();

const useStyles = makeStyles()((theme, { isPersistentSearchBar }) => ({
  list: {
    background: theme.palette.background.surface,
  },
  item: {
    paddingLeft: isIOS || isPersistentSearchBar ? 44 : 66,
    fontSize: isIOS || isPersistentSearchBar ? 16 : 14,
    fontWeight: 400,
  },
  itemNotLast: {
    borderBottom: isIOS && !isPersistentSearchBar
      ? 'none'
      : `1px solid ${theme.components.separatorLine.borderColor}`,
    marginBottom: 1,
  },
  innerContainer: {
    position: 'relative',
  },
}));

/**
 * The list component.
 * @param {Object} props The component props.
 * @returns {JSX|null}
 */
const List = ({ children, isPersistentSearchBar }) => {
  const { classes, cx } = useStyles({ isPersistentSearchBar });

  if (!React.Children.count(children)) {
    return null;
  }

  return (
    <BaseList className={classes.list}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const key = `child-${index}`;
        const { isSelected } = child.props;
        const isLast = index === children.length - 1;

        return (
          <BaseList.Item
            className={cx(classes.item, !isLast && classes.itemNotLast)}
            isSelected={isSelected}
            key={key}
          >
            <div className={classes.innerContainer}>
              {child}
            </div>
          </BaseList.Item>
        );
      })}
    </BaseList>
  );
};

List.Item = Item;

List.propTypes = {
  children: PropTypes.node,
  isPersistentSearchBar: PropTypes.bool,
};

List.defaultProps = {
  children: null,
  isPersistentSearchBar: false,
};

export default List;
