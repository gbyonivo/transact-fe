import React from 'react';
import PropTypes from 'prop-types';
import styles from './textInput.scss';

const TextInput = ({
  defaultValue, label, onChange, placeholder, disabled, name
}) =>
  <div className={styles.textInputWrapper}>
    <label htmlFor={name} className={styles.textInputLabel}>{label}</label>
    <input
      type="text"
      onChange={e => onChange(e.target.value, name)}
      defaultValue={defaultValue}
      disabled={disabled}
      placehold={placeholder}
      className={styles.textInput}
    />
  </div>;

TextInput.propTypes = {
  defaultValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired
};

export default TextInput;