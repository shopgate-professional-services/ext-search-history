import { searchRequesting$ } from '@shopgate/pwa-common-commerce/search/streams';
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

