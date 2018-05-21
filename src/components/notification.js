import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: undefined
    };
  }
  componentDidMount() {
    const { closeNotification } = this.props;
    this.state.timeout = setTimeout(closeNotification, 2000);
  }
  componentWillUnmount() {
    this.setState(() => ({ timeout: undefined }));
  }
  render() {
    const { children, closeNotification } = this.props;
    return (<div>
      <div onClick={closeNotification}>close</div>
      {children}
    </div>);
  }
}

Notification.propTypes = {
  children: PropTypes.any.isRequired,
  closeNotification: PropTypes.func.isRequired
};

export default Notification;