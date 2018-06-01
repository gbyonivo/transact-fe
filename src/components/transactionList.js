import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Loading from './loading';

import styles from './transactionList.scss';
import { queries } from '../queries';
import TransactionListItem from './transactionListItem';

const TransactionList = ({ transactions, accounts: { loading, error, getAccounts }, accountId }) =>
  <section className={styles.transactionListSection}>
    <h2 className={styles.transactionListHeader}>Transactions</h2>
    {loading || error
      ? <Loading data={{ loading, error }} />
      : <div>
        {transactions.map(transaction =>
          <TransactionListItem
            key={transaction._id}
            transaction={transaction}
            accounts={getAccounts}
            accountId={accountId}
          />)}
      </div>}
  </section>;

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  accounts: PropTypes.object.isRequired,
  accountId: PropTypes.string.isRequired
};

export default graphql(queries.ACCOUNTS_QUERY, { name: 'accounts' })(TransactionList);