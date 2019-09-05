import { combineReducers } from "redux";
import event_reducer from "./eventReducers";
import participant_reducer from "./participantReducers";
import competition_reducer from "./competitionReducers";
import rank_reducer from "./rankingReducers";
import trail_reducer from "./trailReducers";

export default combineReducers({
  event_reducer,
  participant_reducer,
  competition_reducer,
  rank_reducer,
  trail_reducer
});
