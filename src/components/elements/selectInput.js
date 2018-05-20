import React from 'react';
import PropTypes from 'prop-types';

import styles from './selectInput.scss';

const SelectInput = ({
  label, options, onChange, name, value
}) =>
  <div className={styles.selectInputWrapper}>
    <label className={styles.selectInputLabel}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value, name)} name={name} className={styles.selectInput}>
      {options.map(option =>
        <option key={option.value} value={option.value}>{option.text}</option>)}
    </select>
  </div>;

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired, text: PropTypes.string.isRequired }))
};

export default SelectInput;