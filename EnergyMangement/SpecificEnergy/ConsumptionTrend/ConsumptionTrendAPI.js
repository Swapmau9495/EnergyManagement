import React, { useEffect,useState } from "react";
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
import ConsumptionChart from "./ConsumptionTrend"
import { useFilterOption } from '../../store/Providers';
import moment from 'moment';

//component to fetch API for shop chart 
const ConsumptionTrendAPI = ({ setRefreshdisable, Refresh, counsumptiontrendFetchHelper }) => {
  const [filterOptions] = useFilterOption();
  const {plant, start_date, end_date } = filterOptions;
  const { response, isloading, error, execute } = counsumptiontrendFetchHelper;
  
  const SaveSelectedId = localStorage.getItem('consumptiontrendbuttonidselected');
  const [toggleIdSelected, setToggleIdSelected] = useState();
  localStorage.setItem('consumptiontrendbuttonidselected', toggleIdSelected);

  useEffect(()=>{
    if(!disable.hourly && !disable.daily && !disable.weekly && !disable.monthly){
      setToggleIdSelected(SaveSelectedId?SaveSelectedId:'daily')

    }
  },[])


  const [data ,setData]=useState(
    [
      {
          "Date": new Date(2022, 3, 20, 10, 1),
          "Energy": 5
      },
      {
          "Date": new Date(2022, 3, 20, 10, 2),
          "Energy": 10
      },
      {
          "Date": new Date(2022, 3, 20,10,3),
          "Energy": 20
      },
      {
          "Date": new Date(2022, 3, 20,10,4),
          "Energy": 40
      },
      {
          "Date":  new Date(2022, 3, 20,10,5),
          "Energy": 20
      },
      {
          "Date":  new Date(2022, 3, 20,10,6),
          "Energy": 10
      },
      {
          "Date":  new Date(2022, 3, 20,10,7),
          "Energy": 15
      },
   
    
    
  ])
  
  const [disable, setIsDisabled] = useState({
    hourly: true,
    daily: true,
    weekly: true,
    monthly: true
  })
  
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
  // console.log(start_date.charAt(1,2),start_date, end_date)
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
  const onChange = (optionId) => {
    // if (optionId === 'daily')
    //   ProdkWhValues();
    // else if (optionId === 'weekly')
    //   ProdkWhValuesWeek();
    // else
    //   ProdkWhValuesMonth();
    setToggleIdSelected(optionId);
  };
  useEffect(() => {
    //condition to disable/enable Datepicker
    if (isloading) {
      setRefreshdisable(true)
    } else {
      setRefreshdisable(false)
    }
  }, [isloading])
  //useeffect to fetch url and set values
  const Consumptionchartvalues = () => {
    execute({
      url: `_ems/function/_trend/`, data: {
        from: start_date,
        to: end_date,
        plant_id:  plant.value,
        metric: 'consumption_chart',
      }
    });

  }
  useEffect(() => {
    Consumptionchartvalues();
  }, [plant.value, start_date, end_date, Refresh])

  //Loader to appear before chart display or before error message
  const Loader = <EuiFlexGroup justifyContent='center' style={{ marginTop: '100px', height: '230px' }}>
    <EuiLoadingChart size="l" />
  </EuiFlexGroup>

  let Data;
  // if (!error) {
    Data = /* isloading ? Loader : */ <ConsumptionChart props={data} />;
  // }
  // else if (error) {
  //   Data = (isloading ? Loader : <EuiFlexItem style={{ alignItems: 'center', marginTop: 100 }}>
  //     <EuiFlexGroup >
  //       There is no data available for selected time period
  //     </EuiFlexGroup>
  //   </EuiFlexItem>
  //   );
  // }

  return (
            <EuiFlexGroup style={{  padding: "0.9em", paddingTop:'-30px' }} > 
    <EuiFlexItem>
      <EuiPanel style={{ height: 395, }}>
        <EuiTitle size="s">
          <EuiText>
            <strong>Consumption Trend</strong>
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
        <EuiSpacer />
        {Data}
      </EuiPanel>
    </EuiFlexItem>
    </EuiFlexGroup>
  )
}
export default ConsumptionTrendAPI;