import React, { useState, useContext, useEffect } from 'react';
import { EuiComboBox, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { ADD_PLANTS, ADD_PRODUCTION } from '../../store/actionTypes';
import { useActiveFilter, useFilterOption } from '../../store/Providers';
import '../../../CommonComponents/CommonSuperSelect.css';

const Combobox = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filterOptions, fetchHelpers, dispatch] = useFilterOption();
  const [activeFilter, filterDispatcher] = useActiveFilter();
  const {  productionFetchHelper } = fetchHelpers;
  const { isloading: productionLoading, execute } = productionFetchHelper;
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setSelectedOptions([])
    setOptions([])
    activeFilter.plant.value && execute({
      url: `_ems/benchmarking/_specs/${activeFilter.plant.value}`, success(data) {
        const tempOptions = data.map((value) => {
          return {
            label: value,
          }
        })
        let result = Object.keys(data).map(key => (data[key]));
          dispatch({ type: ADD_PRODUCTION, payload: result, filterDispatcher });
      },
      error(err) {
        dispatch({ type: ADD_PRODUCTION, payload: [], filterDispatcher });
      }
    })
  }, [activeFilter.plant.value])

  const onChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    filterDispatcher({ type: ADD_PRODUCTION, payload: selectedOptions });
  };

  return (
    <EuiFlexGroup /* style={{ paddingTop: '0.8rem' }} grow={false} */ >
      <EuiFlexItem grow={false}>
        {/* <div className='custom_prodspec_prepend'>Product&nbsp;Specs</div> */}
        <div className="euiFormControlLayout--group commonSuperSelect__div" style={{ gap: '0.01rem' }}>
          <label className="commonSuperSelect__prepend euiFormLabel euiFormControlLayout__prepend"
          //   htmlFor={`Input_value${props.valueOfSelected}`}
          >
            Product&nbsp;Specs
          </label>
          <EuiComboBox
            style={{ width: '100%', minWidth: '180px' }}
            // fullWidth={true}
            className="commonSuperSelect"
            placeholder="Product Specs"
            options={filterOptions.production}
            selectedOptions={activeFilter.production}
            onChange={onChange}
            isClearable={true}
          />
        </div>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}

export default Combobox;