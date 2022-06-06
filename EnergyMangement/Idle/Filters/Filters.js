import React from 'react';
import {
    EuiPanel,
    EuiFlexGroup,
    EuiFlexItem,
} from "@elastic/eui";
import DatePicker from './DatePicker/DatePicker';
import DropDowns from './DropDowns/SelectDropdown';

//Component to display top panel dropdowns and superdatepicker
const Filters = ({setsameplant,setRefresh,updateMetrics,updatetrendChart,updatefunctiontable,updatefunctionchart,updateassettable,updateassetchart}) => {
    return (
        <EuiPanel style={{ marginRight: 1, marginLeft: 1 }} grow={false}>
            <EuiFlexGroup>
                <EuiFlexItem >
                    <DropDowns setsameplant={setsameplant}/>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <DatePicker  updateMetrics={updateMetrics} updatetrendChart={updatetrendChart} updatefunctiontable={updatefunctiontable}
      updatefunctionchart={updatefunctionchart}  updateassettable={updateassettable} updateassetchart={updateassetchart} setRefresh={setRefresh}/>
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiPanel>
    );
}

export default Filters;