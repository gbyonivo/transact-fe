import React from 'react';
import PropTypes from 'prop-types';
import styles from './checkAndFillInputOption.scss';

const isOptionSelected = (selectedOptions, option) =>
  selectedOptions.some(selectedOption => selectedOption.value === option.value);

const getNewSelectedOptions = (selectedOptions, option, isSelected) =>
  isSelected
    ? selectedOptions.filter(selectedOption => selectedOption.value !== option.value)
    : selectedOptions.concat(option);

const getNewSelectionAfterTyping = (selectedOptions, option, inputValue) =>
  selectedOptions
    .filter(selectedOption => selectedOption.value !== option.value)
    .concat({ ...option, inputValue });

const CheckAndFillInputOption = ({
  selectedOptions, option, name, onChange
}) => {
  const isSelected = isOptionSelected(selectedOptions, option);
  const newSelectedOptions = getNewSelectedOptions(selectedOptions, option, isSelected);
  return <div className={`${styles.checkAndFillInputOption} ${isSelected ? styles.isSelected : styles.isNotSelected}`}>
    <div onClick={() => onChange(newSelectedOptions, name)} className={styles.checkAndFillInputOptionText}>
      {option.text}
    </div>
    {
      isSelected
        ? <div className={styles.checkAndFillInputOptionNumberbox}>
          <input
            type="number"
            defaultValue={option.inputValue}
            disabled={!isSelected}
            onChange={e => onChange(getNewSelectionAfterTyping(selectedOptions, option, e.target.value), name)}
          />
        </div>
        : null
    }
  </div>;
};

CheckAndFillInputOption.propTypes = {
  option: PropTypes.object.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CheckAndFillInputOption;