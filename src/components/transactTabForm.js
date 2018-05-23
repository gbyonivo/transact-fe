import React from 'react';
import PropTypes from 'prop-types';
import { ELEMENT_TYPES } from '../constants';
import TextInput from './elements/textInput';
import SelectInput from './elements/selectInput';
import NumberInput from './elements/numberInput';
import Button from './elements/button';

const PickForm = ({
  properties, onChange, state, propertyName, accounts, transactions
}) => {
  switch (properties[propertyName].type) {
  case ELEMENT_TYPES.TEXT_INPUT:
    return (<TextInput
      defaultValue={(state[propertyName] || '').toString()}
      label={properties[propertyName].label}
      placeholder={properties[propertyName].label}
      name={propertyName}
      onChange={onChange}
    />);
  case ELEMENT_TYPES.SELECT_INPUT:
    return <SelectInput
      value={(state[propertyName] || '').toString()}
      options={properties[propertyName].getOptions(accounts, transactions)}
      label={properties[propertyName].label}
      placeholder={properties[propertyName].label}
      name={propertyName}
      onChange={onChange}
    />;
  case ELEMENT_TYPES.NUMBER_INPUT:
    return <NumberInput
      defaultValue={parseFloat(state[propertyName] || 0, 10)}
      label={properties[propertyName].label}
      placeholder={properties[propertyName].label}
      name={propertyName}
      onChange={onChange}
    />;
  default:
    return <div />;
  }
};

const TransactTabForm = props =>
  <div>
    {Object.keys(props.properties).map(key => <PickForm {...props} key={key} propertyName={key}/>)}
    <Button onClick={props.onSubmit} value={'Submit'}/>
  </div>;

TransactTabForm.propTypes = {
  properties: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
};

export default TransactTabForm;