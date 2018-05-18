import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './accountListItem.scss';

const AccountListItem = ({ item }) => <li className={styles.accountListItem}>
  <Link to={`/#/account/${item._id}`}>{item.name}</Link>
</li>;

AccountListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default AccountListItem;