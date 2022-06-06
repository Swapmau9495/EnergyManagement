import React, { useState, useEffect } from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingChart,
  EuiPanel,
  EuiTitle,
  EuiText,
  EuiSpacer,
  EuiButtonGroup
} from "@elastic/eui";
import ProdkWhChart from "./ProdkWhChart";
import { useFilterOption } from '../../../../../store/Providers';
import moment from 'moment';

//component to fetch API for shop chart 
const ProdkWhChartAPI = ({ setRefreshdisable, Refresh, EPchart2FetchHelper }) => {
  const [filterOptions] = useFilterOption();
  const { start_date, end_date } = filterOptions;
  const { response, isloading, error, execute } = EPchart2FetchHelper;
  const [disable, setIsDisabled] = useState({
    hourly: true,
    daily: true,
    weekly: true,
    monthly: true
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
    if (document.querySelector(".euiSuperDatePicker__prettyFormat")) {
      if (document.querySelector(".euiSuperDatePicker__prettyFormat").innerText.split('\n')[0] === 'Last 7 days' ||
        document.querySelector(".euiSuperDatePicker__prettyFormat").innerText.split('\n')[0] === 'Last 30 days' ||
        document.querySelector(".euiSuperDatePicker__prettyFormat").innerText.split('\n')[0] === 'Previous Month' ||
        document.querySelector(".euiSuperDatePicker__prettyFormat").innerText.split('\n')[0] === 'This Month'
      ) {
        setIsDisabled({
          ...disable, hourly: true, daily: false,
          weekly: false,
          monthly: true
        })


      } else if (document.querySelector(".euiSuperDatePicker__prettyFormat").innerText.split('\n')[0] === 'Today' ||
        document.querySelector(".euiSuperDatePicker__prettyFormat").innerText.split('\n')[0] === 'Yesterday') {
        setIsDisabled({
          ...disable, hourly: false, daily: true,
          weekly: true,
          monthly: true
        })

      }
    } else if ((moment(start_date).format('MMM D, YYYY @ HH') === moment().subtract(1, 'day').format('MMM D, YYYY @ HH') && moment(end_date).format('MMM D, YYYY @ HH') === moment().format('MMM D, YYYY @ HH'))
    ) {
      setIsDisabled({
        ...disable, hourly: false, daily: true,
        weekly: true,
        monthly: true
      })

    } else if (moment(start_date).format('MMM D, YYYY @ HH'), moment().subtract(1, 'hour').format('MMM D, YYYY @ HH') && moment(end_date).format('MMM D, YYYY @ HH') === moment().format('MMM D, YYYY @ HH')) {
      setIsDisabled({
        ...disable, hourly: true, daily: true,
        weekly: true,
        monthly: true
      })

    } else {
      setIsDisabled({
        ...disable, hourly: true, daily: false,
        weekly: false,
        monthly: false
      })
    }
  }, [document.querySelector(".euiSuperDatePicker__prettyFormat")?.innerText, start_date, end_date])
  console.log(document.querySelector(".euiSuperDatePicker__prettyFormat"))
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
      setToggleIdSelected(SaveSelectedId)
    }
  },[])
  const ProdkWhValues = () => {
    execute({
      url: `_ems/function/_trend/${filterOptions.drilldowndata.Functionid}`, data: {
        from: start_date,
        to: end_date,
        plant_id: filterOptions.drilldowndata.Plantid,
        metric: 'prod_vs_kwh_per_ton',
        interval: 'day'
      }
    });
  }

  const ProdkWhValuesWeek = () => {
    execute({
      url: `_ems/function/_trend/${filterOptions.drilldowndata.Functionid}`, data: {
        from: start_date,
        to: end_date,
        plant_id: filterOptions.drilldowndata.Plantid,
        metric: 'prod_vs_kwh_per_ton',
        interval: 'week'
      }
    });
  }

  const ProdkWhValuesMonth = () => {
    execute({
      url: `_ems/function/_trend/${filterOptions.drilldowndata.Functionid}`, data: {
        from: start_date,
        to: end_date,
        plant_id: filterOptions.drilldowndata.Plantid,
        metric: 'prod_vs_kwh_per_ton',
        interval: 'month'
      }
    });

  }

  const onChange = (optionId) => {
    if (optionId === 'daily')
      ProdkWhValues();
    else if (optionId === 'weekly')
      ProdkWhValuesWeek();
    else
      ProdkWhValuesMonth();
    setToggleIdSelected(optionId);
  };

  useEffect(() => {
    // fetch API to get chart data
    if (toggleIdSelected === 'daily')
      start_date && end_date && ProdkWhValues();
    else if (toggleIdSelected === 'weekly')
      start_date && end_date && ProdkWhValuesWeek();
    else
      start_date && end_date && ProdkWhValuesMonth();
  }, [start_date, end_date, Refresh])

  //Loader to appear before chart display or before error message
  const Loader = <EuiFlexGroup justifyContent='center' style={{ marginTop: '100px', height: '230px' }}>
    <EuiLoadingChart size="l" />
  </EuiFlexGroup>

  let Data;
  if (!error) {
    if (response) {
      Data = isloading ? Loader : (<ProdkWhChart props={response} />);
    } else if (!response) {
      Data = (isloading ? Loader : <EuiFlexItem style={{ alignItems: 'center', marginTop: 100 }}>
        <EuiFlexGroup >
          There is no data available for selected time period
        </EuiFlexGroup>
      </EuiFlexItem>
      );
    }
  } else if (error) {
    Data = (isloading ? Loader : <EuiFlexItem style={{ alignItems: 'center', marginTop: 100 }}>
      <EuiFlexGroup >
        There is no data available for selected time period
      </EuiFlexGroup>
    </EuiFlexItem>
    );
  }
  return (
    <EuiFlexGroup style={{ padding: "0.9em", paddingTop: '-30px' }} >

      <EuiFlexItem>
        <EuiPanel style={{ height: 355 }}>
          <EuiTitle size="s">
            <EuiText>
              <strong>Production Vs Specific Energy</strong>
            </EuiText>
          </EuiTitle>
          <EuiFlexItem style={{ alignItems: 'flex-end', paddingBottom: '2px', paddingRight: '0.9rem' }} >
            {/* <EuiFlexGroup style={{ marginBottom: '2px', marginTop: '2px' }} > */}
              <EuiButtonGroup
                style={{ width: 420 }}
                buttonSize='s'
                legend="Toggle Time"
                options={toggleButtons}
                idSelected={toggleIdSelected}
                onChange={(id) => onChange(id)}
              // color="primary"
              // buttonSize='s'
              />
            {/* </EuiFlexGroup> */}
          </EuiFlexItem>
          <EuiSpacer size='s' />
          {Data}
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  )

}
export default ProdkWhChartAPI;
