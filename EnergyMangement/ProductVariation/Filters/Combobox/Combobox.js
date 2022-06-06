import React, { useState, useContext, useEffect } from 'react';
import { EuiFlexItem, EuiComboBox, EuiFlexGroup } from '@elastic/eui';
import { BenchValuesContext } from "../../BenchMark"
import { host_name, port_number } from '../../../CommonComponents/Config'
import $ from 'jquery'

const Combobox = ({sameplant}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { state, Dispatch } = useContext(BenchValuesContext);
    //Using Static values

    const [options, setOptions] = useState([]);
    const changeContext = (newValue) => {
        Dispatch({ type: 'UPDATED_INPUT', data: newValue, });
    };
    const onChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        const SelectedVal = selectedOptions.map((a) => a.label)
        changeContext({ ...state, Selected: SelectedVal })
    };

    const GetValues = () => {

        $.ajax({
            url: `${host_name}:${port_number}/_ems/benchmarking/_specs/${state.plantid}`,
            async: true,
            success: function (data) {
                const tempOptions = data.map((value) => {
                    return {
                        label: value,
                        //  inputDisplay: siteArray[1]
                    }
                })
                setOptions(tempOptions)
                if(tempOptions[0]){
                    setSelectedOptions(tempOptions)
                    const SelectedVal= tempOptions.map((a)=>a.label)
                    changeContext({...state,Selected:SelectedVal})
    
                  }
            },
            error: function () {
            }
        });
    }
    useEffect(() => {
            changeContext({ ...state, Selected:''})
        setSelectedOptions([]);
        setOptions([])

        state.plantid  && GetValues()
    }, [state.plantid,sameplant])


    return (
        <EuiFlexGroup style={{ paddingTop: '0.8rem' }} grow={false} >
            <div className='custom_prodspec_prepend'>Product&nbsp;Specs</div>
            <EuiComboBox
                style={{ minWidth: '225px', marginBottom: 11 }}
                // fullWidth={true}
                placeholder="Product Specs"
                options={options}
                selectedOptions={selectedOptions}
                onChange={onChange}
                // onCreateOption={onCreateOption}
                isClearable={true}
            />
        </EuiFlexGroup>
    )
}

export default Combobox;