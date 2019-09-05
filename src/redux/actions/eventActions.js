export const REQUESTED_EVENTS = "REQUESTED_EVENTS";
export const REQUESTED_EVENTS_SUCCESS = "REQUESTED_EVENTS_SUCCESS";
export const REQUESTED_EVENTS_FAILED = "REQUESTED_EVENTS_FAILED";
export const FETCHED_EVENT = "FETCHED_EVENT";

export const requestEvent = () => {
  return {
    type: "REQUESTED_EVENTS"
  };
};

export const requestEventSuccess = events => {
  return {
    type: "REQUESTED_EVENTS_SUCCESS",
    events: events
  };
};

export const requestEventError = () => {
  return {
    type: "REQUESTED_EVENTS_FAILED"
  };
};

export const fetchEvent = () => {
  return {
    type: "FETCHED_EVENT"
  };
};
