import React from 'react';
import PropTypes from 'prop-types';

import styles from './alternativeSelectInputOption.scss';

const AlternativeSelectInputOption = ({
  option, onClick, value, name
}) => <div
  onClick={() => onClick(option.value, name)}
  className={`${value === option.value ? styles.selected : ''} ${styles.option}`}>
  {option.text}
</div>;

AlternativeSelectInputOption.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default AlternativeSelectInputOption;