import { searchRequesting$ } from '@shopgate/engage/search';
import { addSearchHistory } from './action-creators';

/**
 * Subscription.
 * @param {Function} subscribe Subscribe.
 */
const searchHistorySubscriptions = (subscribe) => {
  subscribe(searchRequesting$, ({ dispatch, action }) => {
    if (action.searchPhrase !== '*') {
      dispatch(addSearchHistory(action.searchPhrase));
    }
  });
};

export default searchHistorySubscriptions;

