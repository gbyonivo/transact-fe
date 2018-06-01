import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { compose as reduxCompose } from 'redux';

import TransactTab from './transactTab';
import { mutations, queries } from '../queries';
import TransactTabForm from './transactTabForm';
import Loading from './loading';
import { TRANSACT_VIEWS, NOTIFICATIONS } from '../constants';
import * as actions from '../actions';
import { transactBorrowProperties, transactPaybackProperties, getBorrowParamsFromState, getPaybackParamsFromState } from '../helpers/transact';
import { borrowOptions, paybackOptions } from '../queries/options';
import styles from './transact.scss';

class Transact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paybackAmount: 0,
      borrowAmout: 0,
      receiver: null,
      sender: null,
      rate: 0,
      rateIntervals: 0,
      view: TRANSACT_VIEWS.PAYBACK
    };
    this.selectView = this.selectView.bind(this);
    this.payback = this.payback.bind(this);
    this.borrow = this.borrow.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(value, name) {
    this.setState(() => ({ [name]: value }));
  }
  selectView(view) {
    this.onChange(view, 'view');
  }
  payback() {
    const { payback, account: { _id }, openNotification } = this.props;
    payback({ ...getPaybackParamsFromState(this.state), _id })
      .then(() => {
        openNotification(NOTIFICATIONS.SUCCESS_TRANSACTING);
      })
      .catch((error) => {
        console.error('there was an error sending the query', error); //eslint-disable-line
        openNotification(NOTIFICATIONS.ERROR_TRANSACTING);
      });
  }
  borrow() {
    const { borrow, account: { _id }, openNotification } = this.props;
    borrow({ ...getBorrowParamsFromState(this.state), _id })
      .then(() => {
        openNotification(NOTIFICATIONS.SUCCESS_TRANSACTING);
      })
      .catch((error) => {
        console.error('there was an error sending the query', error); //eslint-disable-line
        openNotification(NOTIFICATIONS.ERROR_TRANSACTING);
      });
  }
  render() {
    const { view } = this.state;
    const { accounts: { loading, error, getAccounts }, account } = this.props;
    return (<div className={styles.transact}>
      <h2>Transact</h2>
      {error || loading
        ? <Loading />
        : <div>
          <div className={styles.transactTabSwitches}>
            <div
              onClick={() => this.selectView(TRANSACT_VIEWS.PAYBACK)}
              className={`${styles.transactTabSwitch} ${view === TRANSACT_VIEWS.PAYBACK ? styles.selected : ''}`}>
              Pay Back
            </div>
            <div
              onClick={() => this.selectView(TRANSACT_VIEWS.BORROW)}
              className={`${styles.transactTabSwitch} ${view === TRANSACT_VIEWS.BORROW ? styles.selected : ''}`}>
              Borrow
            </div>
          </div>
          <TransactTab isActiveView={view === TRANSACT_VIEWS.PAYBACK}>
            <TransactTabForm
              properties={transactPaybackProperties}
              onChange={this.onChange}
              state={this.state}
              onSubmit={this.payback}
              accounts={getAccounts}
              transactions={account.transactions}
            />
          </TransactTab>
          <TransactTab isActiveView={view === TRANSACT_VIEWS.BORROW}>
            <TransactTabForm
              properties={transactBorrowProperties}
              onChange={this.onChange}
              state={this.state}
              onSubmit={this.borrow}
              accounts={getAccounts}
              transactions={account.transactions}
            />
          </TransactTab>
        </div>}
    </div>);
  }
}

Transact.propTypes = {
  account: PropTypes.object.isRequired,
  payback: PropTypes.func.isRequired,
  borrow: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
  accounts: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});
const mapActionsToProps = dispatch => ({ openNotification: reduxCompose(dispatch, actions.openNotification) });

export default connect(mapStateToProps, mapActionsToProps)(compose(
  graphql(queries.ACCOUNTS_QUERY, { name: 'accounts' }),
  graphql(mutations.PAYBACK_QUERY, paybackOptions),
  graphql(mutations.BORROW_QUERY, borrowOptions)
)(Transact));