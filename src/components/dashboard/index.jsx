import { connect } from "react-redux";
import { fetchEvent } from "../../redux/actions/eventActions";
import Dashboard from "./dashboard";

const mapStateToProps = state => ({
  events: state.event_reducer.events.results || [],
  loading: state.event_reducer.loading,
  error: state.event_reducer.error
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchEvent: () => dispatch(fetchEvent())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
