import React from 'react';
import PropTypes from 'prop-types';
import CheckAndFillInputOption from './checkAndFillInputOption';
import styles from './checkAndFillInput.scss';

const CheckAndFill = ({
  label, options, onChange, name, selectedOptions
}) => <div className={styles.checkAndFillInput}>
  <label className={styles.checkAndFillInputLabel}>{label}</label>
  <div className={styles.checkAndFillInputOptions}>
    {options
      .filter(option => option.value !== '')
      .map(option =>
        <CheckAndFillInputOption
          option={option}
          onChange={onChange}
          name={name}
          selectedOptions={selectedOptions}
          key={option.value}
        />)}
  </div>
</div>;

CheckAndFill.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default CheckAndFill;