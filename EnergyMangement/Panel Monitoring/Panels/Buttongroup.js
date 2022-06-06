

import React, { useState, Fragment } from 'react';
import {
  EuiButtonGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiTitle,
  useGeneratedHtmlId,
} from '@elastic/eui';

export default () => {
  

  const toggleButtons = [
      {
       id: `hourly`,
       label: 'Hourly',
     //   isDisabled: disable.hourly,
     },
     {
       id: `daily`,
       label: 'Daily',
     //   isDisabled: disable.daily,
 
     },
     {
       id: `weekly`,
       label: 'Weekly',
     //   isDisabled: disable.weekly,
 
     },
     {
       id: `monthly`,
       label: 'Monthly',
     //   isDisabled: disable.monthly,
 
     },
  ];


  const [toggleIdSelected, setToggleIdSelected] = useState(
    `daily`
  );
  

  const onChange = (optionId) => {
    setToggleIdSelected(optionId);
  };


  return (
    <Fragment     >
        <EuiFlexItem style={{  height:5 }}>
      <EuiButtonGroup
       style={{ width: 320 }}
        buttonSize='s'
        legend="toggle time"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={(id) => onChange(id)}
      />
      </EuiFlexItem>
      <EuiSpacer size="m" />
     
    </Fragment>
  );
};