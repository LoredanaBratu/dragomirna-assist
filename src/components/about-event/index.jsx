import { connect } from "react-redux";
import { fetchEvent } from "../../redux/actions/eventActions";
import { requestParticipant } from "../../redux/actions/participantActions";
import { requestCompetition } from "../../redux/actions/competitionActions";
import aboutEvent from "./aboutEvent";

const mapStateToProps = state => ({
  events: state.event_reducer.events.results || [],
  participant: state.participant_reducer.participant || [],
  competition: state.competition_reducer.competition || [],
  loading: state.event_reducer.loading,
  error: state.event_reducer.error
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchEvent: () => dispatch(fetchEvent()),
  requestParticipant: (eventId, competitionId) =>
    dispatch(requestParticipant(eventId, competitionId)),
  requestCompetition: (eventId, competitionId) =>
    dispatch(requestCompetition(eventId, competitionId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(aboutEvent);
