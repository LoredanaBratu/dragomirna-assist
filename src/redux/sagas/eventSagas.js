// eslint-disable-next-line no-unused-vars
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import {
  FETCHED_EVENT,
  requestEvent,
  requestEventSuccess,
  requestEventError
} from "../actions/eventActions";

function* fetchEventAsync() {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "http://mtb.assist.ro/api/events/news/";

  try {
    yield put(requestEvent());
    const events = yield call(() => {
      return fetch(proxyurl + url).then(res => {
        return res.json();
      });
    });
    yield put(requestEventSuccess(events));
  } catch (error) {
    yield put(requestEventError);
  }
}

export default function* viewEvents() {
  yield takeEvery(FETCHED_EVENT, fetchEventAsync);
}
