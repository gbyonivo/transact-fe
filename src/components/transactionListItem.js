import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './transactionListItem.scss';
import { handleRandomDateFormats } from '../functions';

const findAccount = (accounts, id) => accounts.find(account => account._id === id);

class TransactionListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true
    };
    this.toggleIsCollapsed = this.toggleIsCollapsed.bind(this);
  }
  toggleIsCollapsed() {
    this.setState(state => ({ isCollapsed: !state.isCollapsed }));
  }
  render() {
    const { transaction, accounts, accountId } = this.props;
    const { isCollapsed } = this.state;
    return (<div className={`${styles.transactionListItem} ${isCollapsed ? styles.isCollapsed : styles.isExpanded}`}>
      <div onClick={this.toggleIsCollapsed} className={`${styles.transactionListItemHeader} ${transaction.sender ? styles.payIn : styles.payOut}`}>
        <div className={styles.date}>{handleRandomDateFormats(transaction.date, 'ddd -> YYYY-MM-DD HH:mm')}</div>
        <div className={styles.sender}>{findAccount(accounts, transaction.sender || accountId).name}</div>
        <div className={styles.amount}>{transaction.amount}</div>
        <div className={styles.receiver}>{findAccount(accounts, transaction.receiver || accountId).name}</div>
      </div>
      <div>details</div>
    </div>);
  }
}

TransactionListItem.propTypes = {
  transaction: PropTypes.object.isRequired,
  accountId: PropTypes.string.isRequired,
  accounts: PropTypes.array.isRequired
};

export default TransactionListItem;