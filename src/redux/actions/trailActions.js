export const REQUEST_TRAIL = "REQUEST_TRAIL";
export const REQUEST_TRAIL_SUCCESS = "REQUEST_TRAIL_SUCCESS";
export const REQUEST_TRAIL_ERROR = "REQUEST_TRAIL_ERROR";

export const GET_TRAIL_GPX_REQUEST = "GET_TRAIL_GPX_REQUEST";
export const GET_TRAIL_GPX_SUCCESS = "GET_TRAIL_GPX_SUCCESS";
export const GET_TRAIL_GPX_ERROR = "GET_TRAIL_GPX_ERROR";

export const REMOVE_TRAIL_GPX_REQUEST = "REMOVE_TRAIL_GPX_REQUEST";

export const requestTrail = (competitionId, trail) => {
  return {
    type: REQUEST_TRAIL,
    trail: trail,
    competitionId: competitionId
  };
};

export const requestTrailSuccess = (trail, competitionId) => {
  return {
    type: REQUEST_TRAIL_SUCCESS,
    trail: trail,
    competitionId: competitionId
  };
};

export const requestTrailError = () => {
  return {
    type: REQUEST_TRAIL_ERROR,
    trail: "",
    competitionId: ""
  };
};

export const getTrailGPXRequest = ({ url, id }) => ({
  type: GET_TRAIL_GPX_REQUEST,
  url,
  id
});

export const removeTrailGPXRequest = id => ({
  type: REMOVE_TRAIL_GPX_REQUEST,
  payload: id
});

export const getTrailGPXSuccess = data => ({
  type: GET_TRAIL_GPX_SUCCESS,
  payload: data
});

export const getTrailGPXError = error => ({
  type: GET_TRAIL_GPX_ERROR,
  payload: error
});
