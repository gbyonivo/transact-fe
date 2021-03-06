import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AccountListItemSummary from './accountListItemSummary';
import styles from './accountListItem.scss';

const AccountListItem = ({ item, selectedItem }) =>
  <li className={`${styles.accountListItem} ${selectedItem === item._id ? styles.selectedAccountListItem : ''}`}>
    <Link to={`/account/${item._id}`}>
      <div className={styles.accountListItemName}>{item.name}</div>
      <AccountListItemSummary summary={item.summary} type={item.type} />
    </Link>
  </li>;

AccountListItem.propTypes = {
  item: PropTypes.object.isRequired,
  selectedItem: PropTypes.string
};

export default AccountListItem;