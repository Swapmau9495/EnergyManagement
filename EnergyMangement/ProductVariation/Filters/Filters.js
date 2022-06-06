import React from 'react';
import {
    EuiPanel,
    EuiFlexGroup,
    EuiFlexItem,
} from "@elastic/eui";
import DatePicker from './DatePicker/DatePicker';
import DropDowns from './DropDowns/SelectDropdown';
import Combobox from './Combobox/Combobox'


const Filters = ({setsameplant, setRefresh,updatbenchtable,sameplant}) => {
    return (
        <EuiPanel style={{ marginRight: 1, marginLeft: 1 }} grow={false}>
            <EuiFlexGroup >
                <EuiFlexItem grow={false}>
                    <DropDowns setsameplant={setsameplant} />
                </EuiFlexItem  >
                <EuiFlexItem  grow={false}>
                <Combobox sameplant={sameplant}/>
                </EuiFlexItem>
                <EuiFlexItem />
                <EuiFlexItem grow={false}>
                    <DatePicker updatbenchtable={updatbenchtable} setRefresh={setRefresh} />
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiPanel>
    );
}

export default Filters;