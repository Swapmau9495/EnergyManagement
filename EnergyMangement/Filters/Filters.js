import React from 'react';
import {
    EuiPanel,
    EuiFlexGroup,
    EuiFlexItem,
} from "@elastic/eui";
import DatePicker from './DatePicker/DatePicker';
import DropDown from './DropDowns/Dropdown';
import Combobox from './Combobox/Combobox';
//Component to display top panel dropdowns and superdatepicker
const Filters= ({setRefresh,setsameplant,updateFunctiontab,updateAssettab,updateChart,updateMetrics,hidedropdown,hidecombobx,isRefreshdisable,isDateFilterActive,isComboboxActive,isFunctionDropdownactive}) => {
    return (

        <EuiPanel style={{ marginRight: 1, marginLeft: 1 }} grow={false}>
            <EuiFlexGroup>
                <EuiFlexItem >
              {!hidedropdown && <DropDown isFunctionDropdownactive={isFunctionDropdownactive} setsameplant={setsameplant} />}
                </EuiFlexItem>
                <EuiFlexItem >
               {isComboboxActive &&  <Combobox/> } 
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  {isDateFilterActive && <DatePicker  isRefreshdisable={isRefreshdisable} updateFunctiontab={updateFunctiontab} updateAssettab={updateAssettab}  updateChart={updateChart} updateMetrics={updateMetrics} setRefresh={setRefresh} /> }  
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiPanel>
    );
}

export default Filters;