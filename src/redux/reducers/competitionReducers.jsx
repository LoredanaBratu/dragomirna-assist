import {
  REQUEST_COMPETITION_SUCCESS,
  REQUEST_COMPETITION_ERROR
} from "../actions/competitionActions";

export default function competition_reducer(state = [], { type, competition }) {
  switch (type) {
    case REQUEST_COMPETITION_SUCCESS:
      return {
        ...state,
        competition: competition,
        message: "Success",
        isSuccess: true
      };
    case REQUEST_COMPETITION_ERROR:
      return {
        competition: "",
        ...state,
        message: "Error",
        isSuccess: false
      };
    default:
      return state;
  }
}
