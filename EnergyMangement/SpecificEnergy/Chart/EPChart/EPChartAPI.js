import React, { useState, useEffect, Fragment } from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingChart,
  EuiButtonIcon,
  EuiButton,
  EuiSpacer,
  EuiButtonGroup
} from "@elastic/eui";
import EPChart from "./EPChart";
import moment from 'moment';

import { useActiveFilter } from '../../../store/Providers';

const EPChartAPI = ({ Refresh, EPchartFetchHelper, setRefreshdisable }) => {
  const [activeFilter] = useActiveFilter();
  const { plant, start_date, end_date } = activeFilter;
  const { response, isloading, error, execute } = EPchartFetchHelper;
  const [disable,setIsDisabled]=useState({
    hourly:true,
    daily:true,
    weekly:true,
    monthly:true
  })



  useEffect(() => {
    //condition to disable/enable Datepicker
    if (isloading) {
      setRefreshdisable(true)
    } else {
      setRefreshdisable(false)
    }
  }, [isloading])

  useEffect(() => {
  if(document.querySelector(".euiSuperDatePicker__prettyFormat")){
    if(document.querySelector(".euiSuperDatePicker__prettyFormat").innerText.split('\n')[0]==='Last 7 days' ||
     document.querySelector(".euiSuperDatePicker__prettyFormat").innerText.split('\n')[0]==='Last 30 days' ||
     document.querySelector(".euiSuperDatePicker__prettyFormat").innerText.split('\n')[0]==='Previous Month' ||
     document.querySelector(".euiSuperDatePicker__prettyFormat").innerText.split('\n')[0]==='This Month' 
     ){
      setIsDisabled({...disable,hourly:true,daily:false,
        weekly:false,
        monthly:true})
      

    }else if(document.querySelector(".euiSuperDatePicker__prettyFormat").innerText.split('\n')[0]==='Today' ||
    document.querySelector(".euiSuperDatePicker__prettyFormat").innerText.split('\n')[0]==='Yesterday'){
      setIsDisabled({...disable,hourly:false,daily:true,
        weekly:true,
        monthly:true})
    
    }
  }else if((moment(start_date).format('MMM D, YYYY @ HH')===moment().subtract(1, 'day').format('MMM D, YYYY @ HH') && moment(end_date).format('MMM D, YYYY @ HH')===moment().format('MMM D, YYYY @ HH')) 
  ) {
    setIsDisabled({...disable,hourly:false,daily:true,
     weekly:true,
     monthly:true})
    
  } else if(moment(start_date).format('MMM D, YYYY @ HH'),moment().subtract(1, 'hour').format('MMM D, YYYY @ HH')&& moment(end_date).format('MMM D, YYYY @ HH')===moment().format('MMM D, YYYY @ HH')){
    setIsDisabled({...disable,hourly:true,daily:true,
      weekly:true,
      monthly:true})

  } else  {
    setIsDisabled({...disable,hourly:true,daily:false,
      weekly:false,
      monthly:false})
  } 
  }, [document.querySelector(".euiSuperDatePicker__prettyFormat")?.innerText,start_date,end_date])
// console.log(moment(start_date).format('MMM D, YYYY @ HH'),moment().subtract(1, 'hour').format('MMM D, YYYY @ HH')  )
  // if(document.querySelector(".euiSuperDatePicker__prettyFormat")){

  //   console.log(document.querySelector(".euiSuperDatePicker__prettyFormat"))
  // }

  //Button group to swith for different Options
  const toggleButtons = [
    {
      id: `hourly`,
      label: 'Hourly',
      isDisabled: disable.hourly,
    },
    {
      id: `daily`,
      label: 'Daily',
      isDisabled: disable.daily,

    },
    {
      id: `weekly`,
      label: 'Weekly',
      isDisabled: disable.weekly,

    },
    {
      id: `monthly`,
      label: 'Monthly',
      isDisabled: disable.monthly,

    },
  ];
  const SaveSelectedId = localStorage.getItem('buttonidselected');
  const [toggleIdSelected, setToggleIdSelected] = useState();
  localStorage.setItem('buttonidselected', toggleIdSelected);
  useEffect(()=>{
    if(!disable.hourly && !disable.daily && !disable.weekly && !disable.monthly){
      setToggleIdSelected(SaveSelectedId?SaveSelectedId:'daily')
    }
  },[])
  const EPchartValues = () => {
    if (plant.value) {
      execute({
        url: `_ems/plant/_trend/${plant.value}`, data: {
          from: start_date,
          to: end_date,
          metric: 'prod_vs_kwh_per_ton',
          interval: 'day'
        }
      });
    }
  }

  const EPchartValuesWeekly = () => {
    execute({
      url: `_ems/plant/_trend/${plant.value}`, data: {
        from: start_date,
        to: end_date,
        metric: 'prod_vs_kwh_per_ton',
        interval: 'week'
      }
    });
  }

  const EPchartValuesMonthly = () => {
    execute({
      url: `_ems/plant/_trend/${plant.value}`, data: {
        from: start_date,
        to: end_date,
        metric: 'prod_vs_kwh_per_ton',
        interval: 'month'
      }
    });
  }

  const onChange = (optionId) => {
    if (optionId === 'daily')
      EPchartValues();
    else if (optionId === 'weekly')
      EPchartValuesWeekly();
  /*   else if(optionId === 'hourly'){
      return
    } */else
      EPchartValuesMonthly();
    setToggleIdSelected(optionId);
  };

  useEffect(() => {
    if (toggleIdSelected === 'daily')
      plant.value && EPchartValues();
    else if (toggleIdSelected === 'weekly')
      plant.value && EPchartValuesWeekly();
    /* else if(toggleIdSelected === 'hourly'){
      return
    }*/
     else
      plant.value && EPchartValuesMonthly();
  }, [plant.value, start_date, end_date, Refresh])

  let Loader = <EuiFlexGroup justifyContent='center' style={{ marginTop: '100px', height: '230px' }}>
    <EuiLoadingChart size="l" />
  </EuiFlexGroup>
    ;
  let Data;
  if (!error) {
    if (response) {
      Data = isloading ? Loader : (<EPChart props={response} />);
    } else if (!response) {
      Data = (isloading ? Loader : <EuiFlexItem style={{ alignItems: 'center', marginTop: 100 }}>
        <EuiFlexGroup >
          There is no data available for selected time period
        </EuiFlexGroup>
      </EuiFlexItem>
      );
    }
  }
  else if (error) {
    Data = (isloading ? Loader : <EuiFlexItem style={{ alignItems: 'center', marginTop: 100 }}>
      <EuiFlexGroup >
        There is no data available for selected time period
      </EuiFlexGroup>
    </EuiFlexItem>
    );
  }
  return (
    <Fragment>
      <EuiFlexItem style={{ alignItems: 'flex-end', paddingBottom: '2px', paddingRight: '0.9rem' }} >
        <EuiButtonGroup
          style={{ width: 420 }}
          buttonSize='s'
          legend="Toggle Time"
          options={toggleButtons}
          idSelected={toggleIdSelected}
          onChange={(id) => onChange(id)}
        />
      </EuiFlexItem>
      <EuiSpacer size='s' />
      {Data}
    </Fragment>
  )

}
export default EPChartAPI;
