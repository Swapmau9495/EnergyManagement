import React, { useState, Fragment, useEffect, useContext } from "react";
import CommonPopover from "../../../CommonComponents/CommonPopover";
import Select from '../../../CommonComponents/Select'
import { BenchValuesContext } from "../../BenchMark"
import $ from 'jquery'
import {
    EuiFlexGroup,
    EuiFlexItem,
} from "@elastic/eui";
import {host_name,port_number} from '../../../CommonComponents/Config'

const DropDowns=({setsameplant})=> {
   
    const { state, Dispatch } = useContext(BenchValuesContext);
    const [IsButtonLoading, setIsButtonLoading] = useState({
        Site: false,
        // Plant: false,
    })
    const changeContext = (newValue) => {
        Dispatch({ type: 'UPDATED_INPUT', data: newValue, });
    };
    const [siteoptions, setsiteOptions] = useState([{
        value: '',
        inputDisplay: '',
        id: ""
      },])
    const [options, setOptions] = useState([{
        value: '',
        inputDisplay: '',
        id: ""
      },])
    
    const SavePlant = localStorage.getItem('PlantV'); 
    const [value, setValue] = useState(SavePlant?SavePlant:''); // default selected value of super-select option[0]
    localStorage.setItem('PlantV', value);  // default selected value of super-select option[0]
    
      const SaveSite= localStorage.getItem('SiteV');
      const [sitevalue, setSiteValue] = useState(SaveSite?SaveSite:''); // default selected value of super-select option[0]
      const onChangeSite = (valueSelected) => {
        setSiteValue(valueSelected);//get the value which is selected by user
      }
      const onChange = (valueSelected) => {
        onChangeFunction(valueSelected);
        setsameplant(prev=>!prev)
        setValue(valueSelected);//get the value which is selected by user
      }
      localStorage.setItem('SiteV', sitevalue);

    const Getplant=(SiteValue)=>{
        setValue('')
        onChangeFunction('')

        setOptions([{
            value: '',
            inputDisplay: '',
            id: ""
          },])
          let JWT_Token = JSON.parse(localStorage.getItem('token'))
          $.ajax({
                          url: `${host_name}:${port_number}/config/plants`,
                          headers:{"x-access-tokens": JWT_Token? JWT_Token['token'] : '' },
                          data:{"site_id":SiteValue},
                          method:"GET",
                          dataType: "json",
            // data: {site_id:SiteValue},
            success: function (data) {
              const tempOptions = data.map((plantArray) => {
                return {
                  value: plantArray.plant_id,
                  inputDisplay: plantArray.plant_name
                }
              })
              if (tempOptions[0]) {
                let flag;
                if(tempOptions.some(options => options.value === value)){
                  flag=1
              } else{
                flag=0
              }
              if(flag==0){
                setValue( tempOptions[0].value)
                onChangeFunction(tempOptions[0].value)

              }else if(flag==1){
                setValue(value)
                  onChangeFunction(value)
      
              } 
              }
      
              setOptions(tempOptions)
            },
            error: function (err) {
            }
      
          })
    }

      useEffect(() => {

      }, [])
    const onChangeFunction = (SelectedVal) => {
        changeContext({...state, siteValue: sitevalue, plantid: SelectedVal })

      }

    const loadSite = () => {
 
        $.ajax({
            url: `${host_name}:${port_number}/config/sites`,
            data: {
            },
            success: function (data) {
              const tempOptions = data.map((siteArray) => {
                return {
                  value: siteArray[0],
                  inputDisplay: siteArray[1]
                }
              })
              if (tempOptions[0]) {
                let flag;
                if(tempOptions.some(options => options.value === sitevalue)){
                  flag=1
              } else{
                flag=0
              }
              if(flag==0){
                setSiteValue( tempOptions[0].value)
      
              }else if(flag==1){
                setSiteValue(sitevalue)
              } 
                setsiteOptions(tempOptions)
              }
            },
            error: function (err) {
      
            }
      
          })
    }

  
    useEffect(() => {
        loadSite()
    }, []);

    useEffect(() => {
        const SiteValue = sitevalue ? sitevalue : siteoptions[0].value
        siteoptions[0].value && Getplant(SiteValue);
    }, [sitevalue, siteoptions]);

    return (
        <Fragment>

            <EuiFlexGroup justifyContent='flexStart' gutterSize='l'>
                <EuiFlexItem grow={false}>
                    <Select
                        paddingleft='10px'
                        // Lists={SiteList}
                        options={siteoptions}
                        value={sitevalue}
                        // onChange={onChangeSite}
                        PopoverName='Site'
                        onChange={onChangeSite}
                        IsButtonLoading={IsButtonLoading.Site}
                    />
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <Select
                        // Lists={PlantList}
                        paddingleft='11px'
                        options={options}
                        value={value}
                        onChange={onChange}
                        PopoverName='Plant'
                        // onChange={onChangeFunction}
                        IsButtonLoading={IsButtonLoading.Plant}
                    />
                </EuiFlexItem>
            </EuiFlexGroup>

        </Fragment>

    );
}

export default DropDowns;
