import React from 'react';
import PropTypes from 'prop-types';
import styles from './transactTab.scss';

const TransactTab = ({
  children, isActiveView
}) =>
  <div className={isActiveView ? styles.active : styles.inactive}>
    {children}
  </div>;

TransactTab.propTypes = {
  children: PropTypes.object.isRequired,
  isActiveView: PropTypes.bool.isRequired
};

export default TransactTab;