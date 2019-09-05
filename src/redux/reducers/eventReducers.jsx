import {
  REQUESTED_EVENTS,
  REQUESTED_EVENTS_SUCCESS,
  REQUESTED_EVENTS_FAILED,
  FETCHED_EVENT
} from "../actions/eventActions";

const initialState = {
  events: [],
  loading: false,
  error: false
};

export default function event_reducer(state = initialState, { type, events }) {
  switch (type) {
    case REQUESTED_EVENTS:
      return {
        events: "",
        loading: true,
        error: false
      };
    case REQUESTED_EVENTS_SUCCESS:
      return {
        ...state,
        events: events,
        loading: false,
        error: false
      };
    case FETCHED_EVENT:
      return {
        ...state
      };
    case REQUESTED_EVENTS_FAILED:
      return {
        events: "",
        loading: false,
        error: true
      };

    default:
      return state;
  }
}
