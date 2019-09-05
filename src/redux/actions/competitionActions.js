export const REQUEST_COMPETITION = "REQUEST_COMPETITION";
export const REQUEST_COMPETITION_SUCCESS = "REQUEST_COMPETITION_SUCCESS";
export const REQUEST_COMPETITION_ERROR = "REQUEST_COMPETITION_ERROR";

export const requestCompetition = (eventId, competitionId, competition) => {
  return {
    type: REQUEST_COMPETITION,
    competition: competition,
    eventId: eventId,
    competitionId: competitionId
  };
};

export const requestCompetitionSuccess = (
  competition,
  eventId,
  competitionId
) => {
  return {
    type: REQUEST_COMPETITION_SUCCESS,
    competition: competition,
    eventId: eventId,
    competitionId: competitionId
  };
};

export const requestCompetitionError = () => {
  return {
    type: REQUEST_COMPETITION_ERROR,
    competition: "",
    eventId: "",
    competitionId: ""
  };
};
