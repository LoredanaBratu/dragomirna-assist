import viewEvents from "./eventSagas";
import watchParticipants from "./participantSagas";
import watchCompetition from "./competitionSagas";
import watchRank from "./rankingSagas";
import { watchTrail, wachGetTrailGpx } from "./trailSagas";

import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    viewEvents(),
    watchParticipants(),
    watchCompetition(),
    watchRank(),
    watchTrail(),
    wachGetTrailGpx()
  ]);
}
