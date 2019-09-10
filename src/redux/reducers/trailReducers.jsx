import {
  REQUEST_TRAIL,
  REQUEST_TRAIL_SUCCESS,
  REQUEST_TRAIL_ERROR,
  GET_TRAIL_GPX_ERROR,
  GET_TRAIL_GPX_SUCCESS,
  REMOVE_TRAIL_GPX_REQUEST
} from "../actions/trailActions";

export default function trail_reducer(
  state = {
    gpx: {},
    isLoading: false
  },
  { type, trail, payload }
) {
  switch (type) {
    case REQUEST_TRAIL:
      return {
        ...state,
        message: "Loading",
        isLoading: true
      };
    case REQUEST_TRAIL_SUCCESS:
      return {
        ...state,
        trail: trail,
        message: "Success",
        isSuccess: true,
        isLoading: false
      };
    case REQUEST_TRAIL_ERROR:
      return {
        ...state,
        trail: "",
        isLoading: false,
        message: "Error",
        isSuccess: false
      };
    case GET_TRAIL_GPX_SUCCESS:
      return {
        ...state,
        gpx: {
          ...state.gpx,
          ...payload
        },

        message: "Success",
        isSuccess: true
      };

    case GET_TRAIL_GPX_ERROR:
      return {
        ...state,
        message: payload,
        isSuccess: false
      };
    case REMOVE_TRAIL_GPX_REQUEST:
      return {
        ...state,
        gpx: Object.keys(state.gpx).reduce((obj, key) => {
          if (+key !== payload) {
            return {
              ...obj,
              [key]: state.gpx[key]
            };
          }
          return obj;
        }, {})
      };

    default:
      return state;
  }
}
