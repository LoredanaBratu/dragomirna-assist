import {
  REQUEST_PARTICIPANT_SUCCESS,
  REQUEST_PARTICIPANT_ERROR
} from "../actions/participantActions";

export default function participant_reducer(state = [], { type, participant }) {
  switch (type) {
    case REQUEST_PARTICIPANT_SUCCESS:
      return {
        ...state,
        participant: participant,
        message: "Success",
        isSuccess: true
      };
    case REQUEST_PARTICIPANT_ERROR:
      return {
        ...state,
        participant: "",
        message: "Error",
        isSuccess: false
      };
    default:
      return state;
  }
}
