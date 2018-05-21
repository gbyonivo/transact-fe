import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { queries } from '../queries';
import Loading from './loading';
import AccountListItem from './accountListItem';
import styles from './accountListMenu.scss';
import { ACCOUNT_TYPES } from '../constants';

const sortAccounts = (accounts) => {
  const borrowerAccounts = accounts.filter(account => account.type === ACCOUNT_TYPES.BORROWER);
  const otherAccounts = accounts.filter(account => account.type !== ACCOUNT_TYPES.BORROWER);
  borrowerAccounts.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  otherAccounts.sort((a, b) => a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1);
  return [...otherAccounts, ...borrowerAccounts];
};

const graphqlOptions = { name: 'accounts' };

const AccountListMenu = ({ accounts: { loading, getAccounts, error }, match }) => <div className={styles.accountListMenu}>
  <h4 className={styles.accountListMenuHeader}>Accounts</h4>
  {
    loading || error
      ? <Loading data={{ loading, error }} />
      : <ul className={styles.accountList}>
        <li><Link to="/account/new">New Account</Link></li>
        {sortAccounts(getAccounts).map(account =>
          <AccountListItem item={account} key={account.id || account.name} selectedItem={match.params.id} />)}
      </ul>
  }
</div>;

AccountListMenu.propTypes = {
  accounts: PropTypes.object,
  match: PropTypes.object
};

export default graphql(queries.ACCOUNTS_QUERY, graphqlOptions)(AccountListMenu);