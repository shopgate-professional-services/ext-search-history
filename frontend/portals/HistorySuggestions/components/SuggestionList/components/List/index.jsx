import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BaseList from '@shopgate/pwa-common/components/List';
import BaseListItem from '@shopgate/pwa-common/components/List/components/Item';
import Item from './components/Item';
import styles from './style';

/**
 * The list component.
 */
class List extends Component {
  static Item = Item;

  static propTypes = {
    children: PropTypes.node,
    isPersistentSearchBar: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    isPersistentSearchBar: false,
  };

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const { children, isPersistentSearchBar } = this.props;

    if (!React.Children.count(children)) {
      return null;
    }

    return (
      <BaseList className={styles.list}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }
          // The key for each child.
          const key = `child-${index}`;
          // Selected state for the child.
          const { isSelected } = child.props;
          // Whether or not this child is the last.
          const isLast = (index === children.length - 1);

          let classes = styles.item(isPersistentSearchBar);

          if (!isLast) {
            classes += ` ${styles.itemNotLast(isPersistentSearchBar)}`;
          }

          return (
            <BaseListItem
              className={classes}
              isSelected={isSelected}
              key={key}
            >
              <div className={styles.innerContainer(isPersistentSearchBar)}>
                {child}
              </div>
            </BaseListItem>
          );
        })}
      </BaseList>
    );
  }
}

export default List;
