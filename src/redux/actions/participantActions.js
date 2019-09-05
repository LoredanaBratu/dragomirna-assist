export const REQUEST_PARTICIPANT = "REQUEST_PARTICIPANT";
export const REQUEST_PARTICIPANT_SUCCESS = "REQUEST_PARTICIPANT_SUCCESS";
export const REQUEST_PARTICIPANT_ERROR = "REQUEST_PARTICIPANT_ERROR";

export const requestParticipant = (eventId, competitionId, participant) => {
  return {
    type: REQUEST_PARTICIPANT,
    participant: participant,
    eventId: eventId,
    competitionId: competitionId
  };
};

export const requestParticipantSuccess = (
  participant,
  eventId,
  competitionId
) => {
  return {
    type: REQUEST_PARTICIPANT_SUCCESS,
    participant: participant,
    eventId: eventId,
    competitionId: competitionId
  };
};

export const requestParticipantError = () => {
  return {
    type: REQUEST_PARTICIPANT_ERROR,
    participant: "",
    eventId: "",
    competitionId: ""
  };
};
