import { ACTIONS } from '../constants';

export const openNotification = notification =>
  dispatch => dispatch({
    type: ACTIONS.OPEN_NOTIFICATION,
    payload: {
      notification
    }
  });

export const closeNotification = () =>
  (dispatch) => {
    dispatch({
      type: ACTIONS.CLOSE_NOTIFICATION
    });
  };
