import React from 'react';
import PropTypes from 'prop-types';
import AlternativeSelectInputOptions from './alternativeSelectInputOption';
import styles from './alternativeSelectInput.scss';

const AlternativeSelectInput = ({
  label, options, onChange, name, value
}) => <div className={styles.alternativeSelectInput}>
  <label className={styles.alternativeSelectInputLabel}>{label}</label>
  <div className={styles.alternativeSelectInputOptions}>
    {options
      .filter(option => option.value !== '')
      .map(option =>
        <AlternativeSelectInputOptions
          option={option}
          onClick={onChange}
          name={name}
          value={value}
          key={option.value}
        />)}
  </div>
</div>;

AlternativeSelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }))
};

export default AlternativeSelectInput;