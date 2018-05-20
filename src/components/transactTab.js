import React from 'react';
import PropTypes from 'prop-types';

const TransactTab = ({
  children, headerText, selectView, isActiveView
}) =>
  <div className={isActiveView ? 'active' : 'inactive'}>
    <h2 onClick={selectView}>{headerText}</h2>
    {children}
  </div>;

TransactTab.propTypes = {
  children: PropTypes.object.isRequired,
  selectView: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  isActiveView: PropTypes.bool.isRequired
};

export default TransactTab;