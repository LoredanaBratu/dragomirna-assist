export const REQUEST_RANK = "REQUEST_RANK";
export const REQUEST_RANK_SUCCESS = "REQUEST_RANK_SUCCESS";
export const REQUEST_RANK_ERROR = "REQUEST_RANK_ERROR";

export const requestRank = (competitionId, rank) => {
  return {
    type: REQUEST_RANK,
    rank: rank,
    competitionId: competitionId
  };
};

export const requestRankSuccess = (rank, competitionId) => {
  return {
    type: REQUEST_RANK_SUCCESS,
    rank: rank,
    competitionId: competitionId
  };
};

export const requestRankError = () => {
  return {
    type: REQUEST_RANK_ERROR,
    rank: "",
    competitionId: ""
  };
};
