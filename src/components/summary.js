import React from 'react';
import PropTypes from 'prop-types';
import { SUMMARY_HEADERS } from '../constants';
import Loading from './loading';

import styles from './summary.scss';

const mockSummaryObject = {
  profit: 22000,
  lentOut: 70000,
  expectedProfit: 7000,
  miscellaneous: 15000,
  loss: 10000
};

const Summary = ({ summary: { getSummary, loading, error } }) => <div className={styles.summary}>
  <h2 className={styles.header}>Business Transactions Summary</h2>
  {
    loading || error
      ? <Loading data={{ loading, error }} />
      : <ul className={styles.summaryList}>
        {
          Object.keys(getSummary).map(key =>
            <li key={key} className={styles.summaryItem}>
              <div className={styles.summaryItemHeader}>{SUMMARY_HEADERS[key] || key}</div>
              <div className={styles.summaryItemBody}>£{mockSummaryObject[key]}</div>
            </li>)
        }
      </ul>
  }
</div>;

Summary.defaultProps = {
  summary: {
    loading: false,
    error: null,
    getSummary: mockSummaryObject
  }
};

Summary.propTypes = {
  summary: PropTypes.object
};

export default Summary;
