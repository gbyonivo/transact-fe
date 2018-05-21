import React from 'react';
import PropTypes from 'prop-types';

import styles from './transactionList.scss';

const TransactionList = ({ transactions }) =>
  <section className={styles.transactionListSection}>
    <h2 className={styles.transactionListHeader}>Transactions</h2>
    <ul className={styles.transactionList}>
      {transactions.map(transaction =>
        <li className={styles.transactionListItem} key={transaction._id}>{transaction.amount}</li>)}
    </ul>
  </section>;

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired
};

export default TransactionList;