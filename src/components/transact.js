import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransactTab from './transactTab';
import TransactTabForm from './transactTabForm';
import { TRANSACT_VIEWS } from '../constants';
import { transactBorrowProperties, transactPaybackProperties } from '../helpers/transact';

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