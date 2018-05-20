import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransactTab from './transactTab';
import { ELEMENT_TYPES, ACCOUNT_TYPES, TRANSACT_VIEWS } from '../constants';
import TransactTabForm from './transactTabForm';

const transactPaybackProperties = {
  paybackAmount: {
    label: 'Payback Amount',
    type: ELEMENT_TYPES.NUMBER_INPUT
  },
  receiver: {
    label: 'Paying Into',
    type: ELEMENT_TYPES.SELECT_INPUT,
    getOptions: accounts => (accounts || [])
      .filter(account => account.type === ACCOUNT_TYPES.LENDER)
      .map(account => ({ text: account.name, value: account._id }))
  }
};

const transactBorrowProperties = {
  borrowAmount: {
    label: 'Amount To Be Borrowed',
    type: ELEMENT_TYPES.NUMBER_INPUT
  },
  rate: {
    label: 'Interest Rate',
    type: ELEMENT_TYPES.TEXT_INPUT
  },
  rateIntervals: {
    label: 'Rate Intervals (months)',
    type: ELEMENT_TYPES.TEXT_INPUT
  },
  sender: {
    label: 'Paid From',
    type: ELEMENT_TYPES.SELECT_INPUT,
    getOptions: accounts => (accounts || [])
      .filter(account => account.type === ACCOUNT_TYPES.LENDER)
      .map(account => ({ text: account.name, value: account._id }))
  }
};

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
    // this.payback = this.payback.bind(this);
    // this.borrow = this.borrow.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(value, name) {
    this.setState(() => ({ [name]: value }));
  }
  selectView(view) {
    this.onChange('view', view);
  }
  // payback() { }
  // borrow() { }
  render() {
    const { view } = this.state;
    return (<div>
      <TransactTab
        selectView={() => this.selectView(TRANSACT_VIEWS.PAYBACK)}
        headerText={'Pay Back'}
        isActiveView={view === TRANSACT_VIEWS.PAYBACK}>
        <TransactTabForm properties={transactPaybackProperties} onChange={this.onChange} state={this.state} />
      </TransactTab>
      <TransactTab
        selectView={() => this.selectView(TRANSACT_VIEWS.BORROW)}
        headerText={'Borrow'}
        isActiveView={view === TRANSACT_VIEWS.BORROW}>
        <TransactTabForm properties={transactBorrowProperties} onChange={this.onChange} state={this.state} />
      </TransactTab>
    </div>);
  }
}

Transact.propTypes = {
  account: PropTypes.object.isRequired
};

export default Transact;