import React from 'react';
import PropTypes from 'prop-types';
import styles from './numberInput.scss';

const NumberInput = ({
  defaultValue, label, onChange, placeholder, disabled, name, min, max
}) =>
  <div className={styles.numberInputWrapper}>
    <label htmlFor={name} className={styles.numberInputLabel}>{label}</label>
    <input
      type="number"
      onChange={e => onChange(e.target.value, name)}
      defaultValue={defaultValue}
      disabled={disabled}
      placehold={placeholder}
      className={styles.numberInput}
      min={min}
      max={max}
    />
  </div>;

NumberInput.propTypes = {
  defaultValue: PropTypes.number.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired
};

export default NumberInput;