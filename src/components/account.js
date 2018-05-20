import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { queries } from '../queries';
import Loading from './loading';
import styles from './account.scss';
import AccountDetails from './accountDetails';
import Transact from './transact';

const graphqlOptions = {
  name: 'account',
  options: ownProps => ({
    variables: {
      id: ownProps.match.params.id
    }
  })
};

const Account = ({ account: { loading, error, getAccount } }) => <div className={styles.account}>
  {
    loading || error
      ? <Loading data={{ loading, error }} />
      : <div>
        <AccountDetails account={getAccount}/>
        <Transact account={getAccount}/>
      </div>
  }
</div>;

Account.propTypes = {
  account: PropTypes.object
};

export default graphql(queries.ACCOUNT_QUERY, graphqlOptions)(Account);