import React, { useState } from 'react';
import { EuiSuperSelect, EuiFlexGroup } from '@elastic/eui';
import './Select.css'
import $ from 'jquery'
import { useEffect } from 'react';
const Select = ({ options, value, onChange, PopoverName,paddingleft }) => {

  return (

    <EuiFlexGroup style={{ paddingTop: '0.8rem' }} grow={false}>
      <div className='custom_prepend' style={{paddingLeft:paddingleft}}>{PopoverName}</div>
      <div className='DDwidth'>
      <EuiSuperSelect

        options={options ? options : ''}
        valueOfSelected={value}
        onChange={(value) => onChange(value)}
        // style={{width:200,paddingRight:100}}
      />
      </div>

    </EuiFlexGroup>

  );
};

export default Select;