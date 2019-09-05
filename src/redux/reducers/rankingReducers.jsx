import {
  REQUEST_RANK_SUCCESS,
  REQUEST_RANK_ERROR
} from "../actions/rankingActions";

export default function rank_reducer(state = [], { type, rank }) {
  switch (type) {
    case REQUEST_RANK_SUCCESS:
      return {
        ...state,
        rank: rank,
        message: "Success",
        isSuccess: true
      };
    case REQUEST_RANK_ERROR:
      return {
        ...state,
        rank: "",
        message: "Error",
        isSuccess: false
      };
    default:
      return state;
  }
}
