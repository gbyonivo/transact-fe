import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { queries } from '../queries';
import Loading from './loading';
import styles from './account.scss';
import AccountDetails from './accountDetails';
import Transact from './transact';
import TransactionList from './transactionList';

const CREATE_MODE_ID = 'new';

const graphqlOptions = {
  name: 'account',
  skip: ownProps => ownProps.match.params.id === CREATE_MODE_ID,
  options: ownProps => ({
    variables: {
      id: ownProps.match.params.id
    }
  })
};

const Account = ({
  account: { loading, error, getAccount }, match: { params: { id } }
}) => <div className={styles.account}>
  {
    loading || error
      ? <Loading data={{ loading, error }} />
      : <div>
        <AccountDetails account={getAccount} />
        { id !== CREATE_MODE_ID ? <Transact account={getAccount} /> : null }
        { id !== CREATE_MODE_ID ? <TransactionList transactions={getAccount.transactions} /> : null }
      </div>
  }
</div>;

Account.defaultProps = {
  account: {
    loading: false,
    error: null,
    getAccount: {}
  }
};

Account.propTypes = {
  account: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default graphql(queries.ACCOUNT_QUERY, graphqlOptions)(Account);