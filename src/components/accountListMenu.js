import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { queries } from '../queries';
import Loading from './loading';
import AccountListItem from './accountListItem';
import styles from './accountListMenu.scss';

const graphqlOptions = { name: 'accounts' };

const AccountListMenu = ({ accounts: { loading, getAccounts, error } }) => <div className={styles.accountListMenu}>
  <h4 className={styles.accountListMenuHeader}>Accounts</h4>
  {
    loading || error
      ? <Loading data={{ loading, error }} />
      : <ul className={styles.accountList}>{getAccounts.map(account =>
        <AccountListItem item={account} key={account.id || account.name} />)}
      </ul>
  }
</div>;

AccountListMenu.propTypes = {
  accounts: PropTypes.object
};

export default graphql(queries.ACCOUNTS_QUERY, graphqlOptions)(AccountListMenu);