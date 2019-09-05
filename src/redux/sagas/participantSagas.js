import { put, call, takeLatest } from "redux-saga/effects";
import {
  REQUEST_PARTICIPANT_ERROR,
  requestParticipantSuccess,
  REQUEST_PARTICIPANT
} from "../actions/participantActions";

export const requestParticipantService = request => {
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
    "/participants/";

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
    const response = yield call(requestParticipantService, payload);
    yield put(requestParticipantSuccess(response));
  } catch (error) {
    yield put({ type: REQUEST_PARTICIPANT_ERROR, error });
  }
}

export default function* watchParticipants() {
  yield takeLatest(REQUEST_PARTICIPANT, registerSaga);
}
