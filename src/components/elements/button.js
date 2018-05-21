import React from 'react';
import PropTypes from 'prop-types';

import styles from './button.scss';

const Button = ({ isLoading, onClick, value }) =>
  isLoading
    ? <span className={styles.buttonLoading}>Loading</span>
    : <button onClick={onClick} value={value} className={styles.button}>{value}</button>;

Button.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Button;