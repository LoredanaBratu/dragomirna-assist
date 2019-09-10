import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import {
  REQUEST_TRAIL_ERROR,
  requestTrailSuccess,
  getTrailGPXError,
  getTrailGPXSuccess,
  REQUEST_TRAIL,
  GET_TRAIL_GPX_REQUEST
} from "../actions/trailActions";

const makeRequest = ({ url }) => {
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  return fetch(proxyurl + url, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};

export const requestTrailService = request => {
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url =
    "http://mtb.assist.ro/api/events/competition/" +
    request.competitionId +
    "/trails/";
  console.log("url", url);

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
    const response = yield call(requestTrailService, payload);
    yield put(requestTrailSuccess(response));
  } catch (error) {
    yield put({ type: REQUEST_TRAIL_ERROR, error });
  }
}

function* getTrailGpx({ url, id, cb = () => null }) {
  try {
    const { features } = yield call(makeRequest, { url });

    const response = features[0].geometry.coordinates[0];
    yield put(
      getTrailGPXSuccess({
        [id]: response.map(([lat, lng]) => ({
          lat: lng,
          lng: lat
        }))
      })
    );
    cb();
  } catch (err) {
    yield put(getTrailGPXError("Error"));
  }
}

export function* watchTrail() {
  yield takeLatest(REQUEST_TRAIL, registerSaga);
}

export function* wachGetTrailGpx() {
  yield takeEvery(GET_TRAIL_GPX_REQUEST, getTrailGpx);
}
