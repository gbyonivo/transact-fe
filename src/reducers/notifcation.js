import { ACTIONS } from '../constants';

const initialState = {
  notification: {}
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case ACTIONS.OPEN_NOTIFICATION:
    return { ...state, notification: payload.notification };
  case ACTIONS.CLOSE_NOTIFICATION:
    return { ...state, notification: {} };
  default:
    return state;
  }
};

export default notificationReducer;