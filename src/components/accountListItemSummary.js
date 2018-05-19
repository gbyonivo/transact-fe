import React from 'react';
import PropTypes from 'prop-types';

import styles from './accountListItemSummary.scss';
import { ACCOUNT_TYPES } from '../constants';

const AccountListItemSummary = ({ summary, type }) => <div className={styles.accountListItemSummary}>
  {
    type !== ACCOUNT_TYPES.PROFIT
      ? <div>
        {type === ACCOUNT_TYPES.BORROWER ? 'P' : 'OUT'}: £{summary.paid}
      </div>
      : null
  }
  <div>
    {type === ACCOUNT_TYPES.BORROWER ? 'B' : 'IN'}: £{summary.borrowed}
  </div>
  {
    type === ACCOUNT_TYPES.BORROWER
      ? <div>I: £{summary.interest}</div>
      : null
  }
</div>;

AccountListItemSummary.propTypes = {
  summary: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

export default AccountListItemSummary;