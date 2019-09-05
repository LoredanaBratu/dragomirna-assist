import { put, call, takeLatest } from "redux-saga/effects";
import {
  REQUEST_COMPETITION_ERROR,
  requestCompetitionSuccess,
  REQUEST_COMPETITION
} from "../actions/competitionActions";

export const requestCompetitionService = request => {
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url =
    "http://mtb.assist.ro/api/events/" +
    request.eventId +
    "/competition/" +
    request.competitionId +
    "/details/";

  return fetch(proxyurl + url, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};

export function* registerSaga(payload) {
  try {
    const response = yield call(requestCompetitionService, payload);
    yield put(requestCompetitionSuccess(response));
  } catch (error) {
    yield put({ type: REQUEST_COMPETITION_ERROR, error });
  }
}

export default function* watchCompetition() {
  yield takeLatest(REQUEST_COMPETITION, registerSaga);
}
