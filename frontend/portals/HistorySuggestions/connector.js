import { connect } from 'react-redux';
import { getSearchHistory } from '../../selectors';
import { deleteSearchHistory } from '../../action-creators';

/**
 * Maps state to props.
 * @param {Object} state State.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  searchHistory: getSearchHistory(state),
});

const mapDispatchToProps = {
  deleteSearchHistory,
};

export default connect(mapStateToProps, mapDispatchToProps);
