import { connect } from "react-redux";
import { requestCompetition } from "../../redux/actions/competitionActions";
import { requestRank } from "../../redux/actions/rankingActions";
import {
  requestTrail,
  getTrailGPXRequest,
  getTrailGPXSuccess,
  removeTrailGPXRequest
} from "../../redux/actions/trailActions";
import roadDetails from "./roadDetails";

const mapStateToProps = state => ({
  gpxData: state.trail_reducer.gpx || {},
  competition: state.competition_reducer.competition || [],
  rank: state.rank_reducer.rank || [],
  trail: state.trail_reducer.trail || []
});

const mapDispatchToProps = {
  requestTrail,
  getTrailGPXRequest,
  getTrailGPXSuccess,
  removeTrailGPXRequest,
  requestRank,
  requestCompetition
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(roadDetails);
