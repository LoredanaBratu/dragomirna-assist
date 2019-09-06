import { put, call, takeLatest } from "redux-saga/effects";
import {
  REQUEST_RANK_ERROR,
  requestRankSuccess,
  REQUEST_RANK
} from "../actions/rankingActions";

export const requestRankService = request => {
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url =
    "http://mtb.assist.ro/api/events/participant/raking/" +
    request.competitionId;
  console.log("ranking", url);

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
    const response = yield call(requestRankService, payload);
    yield put(requestRankSuccess(response));
  } catch (error) {
    yield put({ type: REQUEST_RANK_ERROR, error });
  }
}

export default function* watchRank() {
  yield takeLatest(REQUEST_RANK, registerSaga);
}
