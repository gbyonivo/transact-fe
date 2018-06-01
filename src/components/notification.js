import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import styles from './notification.scss';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: undefined
    };
  }
  componentWillReceiveProps({ closeNotification, notification }) {
    if (notification.type) {
      this.state.timeout = setTimeout(closeNotification, 5000);
    }
  }
  componentWillUnmount() {
    this.setState(() => ({ timeout: undefined }));
  }
  render() {
    const { notification, closeNotification } = this.props;
    return (<div className={`${styles.notification} ${notification.text ? styles.notificationOnScreen : styles.notificationOffScreen}`}>
      <div onClick={closeNotification} className={styles.close}/>
      {notification.text || ''}
    </div>);
  }
}

Notification.propTypes = {
  notification: PropTypes.any.isRequired,
  closeNotification: PropTypes.func.isRequired
};

const mapStateToProps = ({ notification: { notification } }) => ({
  notification
});

const mapActionsToProps = dispatch => ({
  closeNotification: compose(dispatch, actions.closeNotification)
});

export default connect(mapStateToProps, mapActionsToProps)(Notification);