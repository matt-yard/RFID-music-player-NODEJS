const SET_SELECTED_TRACK = "SET_SELECTED_TRACK";

export const setSelectedTrack = (selectedTrack) => ({
  type: SET_SELECTED_TRACK,
  selectedTrack,
});

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_SELECTED_TRACK:
      return action.selectedTrack;
    default:
      return state;
  }
};
