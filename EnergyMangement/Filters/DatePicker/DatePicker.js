import React, { useState, useRef, useContext,useEffect } from "react";
import {
  EuiSuperDatePicker,
  EuiFlexItem,
} from "@elastic/eui";
import moment from 'moment';
import { ADD_STARTDATE, ADD_ENDDATE } from '../../store/actionTypes';
import { useActiveFilter, useFilterOption } from '../../store/Providers';
import { add } from "@amcharts/amcharts4/.internal/core/utils/Array";


const DatePicker = ({setRefresh,setsameplant,updateFunctiontab,updateAssettab,updateChart,updateMetrics,isRefreshdisable}) => {
  let FilterDetails={}
   const [filterOptions, fetchHelpers, dispatch] = useFilterOption();
  const [activeFilter, filterDispatcher] = useActiveFilter();

//   //function to change value in usereducer state
  const changeInputValue = (startdate,enddate) => {
    // Dispatch({ type: 'UPDATE_INPUT', data: newValue, });
    dispatch({ type: ADD_STARTDATE, payload: startdate, filterDispatcher, init: FilterDetails });
    dispatch({ type: ADD_ENDDATE, payload: enddate, filterDispatcher, init: FilterDetails });
  };
  const SaveStartDate = localStorage.getItem('startDate');
  const SaveEndDate = localStorage.getItem('endDate');
  const Reference = useRef(null);
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState(SaveStartDate?SaveStartDate:moment().subtract(6, 'days').toISOString());
  const [end, setEnd] = useState(SaveEndDate?SaveEndDate:moment().toISOString());
  const [isPaused, setIsPaused] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState();

  useEffect(()=>{
    changeInputValue(start,end)
},[start,end])

  const onTimeChange = ({ start, end, label }) => {
    const recentlyUsedRange = recentlyUsedRanges.filter((recentlyUsedRange) => {
      const isDuplicate =
        recentlyUsedRange.start === start && recentlyUsedRange.end === end;
      return !isDuplicate;
    });
    recentlyUsedRange.unshift({ start, end });
    setStart(start);
    setEnd(end);
    setRecentlyUsedRanges(
      recentlyUsedRange.length > 10
        ? recentlyUsedRange.slice(0, 9)
        : recentlyUsedRange
    );
    setIsLoading(true);
    startLoading();
    //changeInput to get absolute date values or start end values
    // changeInputValue({ ...state,timeValue:`${start}+%20${end}`})

    //to get recently used dates values in API
    // changeInputValue({ ...state,timeValue:recentlyUsedRange})
    changeInputValue(start,end)
    localStorage.setItem('startDate',start)
    localStorage.setItem('endDate',end)

  };
  const onStartInputChange = (e) => {
    setStart(e.target.value);
  };

  const onEndInputChange = (e) => {
    setEnd(e.target.value);
  };
  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };
  var DateRange = [
  { "start": moment().add(1, 'day').startOf('day').toISOString().replace(/T.*/gi, 'T00:00:00.000Z'), "end": moment().toISOString().replace(/T.*/gi, 'T23:59:59.000Z'), "label": "Today"},
  { "start": moment().startOf('day').toISOString().replace(/T.*/gi, 'T00:00:00.000Z'), "end": moment().subtract(1, 'days').endOf('day').toISOString().replace(/T.*/gi, 'T23:59:59.000Z'), "label": "Yesterday"},
  { "start": moment().startOf('month').add(1,'day').toISOString().replace(/T.*/gi, 'T00:00:00.000Z'), "end":moment().toISOString().replace(/T.*/gi, 'T23:59:59.000Z'), "label": "This Month" },
  { "start":moment().subtract(1, 'month').startOf('month').add(1,'day').toISOString().replace(/T.*/gi, 'T00:00:00.000Z'), "end": moment().subtract(1, 'month').endOf('month').toISOString().replace(/T.*/gi, 'T23:59:59.000Z'), "label": "Previous Month" },
  { "start": moment().subtract(1, 'hour').toISOString().replace(/Z.*/gi, 'Z'), "end": moment().toISOString().replace(/Z.*/gi, 'Z'), "label": "Last 1 hour" },
  { "start": moment().subtract(1, 'day').toISOString(), "end": moment().toISOString(), "label": "Last 24 hours" },
  { "start": moment().subtract(7, 'days').toISOString().replace(/T.*/gi, 'T00:00:00.000Z'), "end": moment().toISOString().replace(/T.*/gi, 'T23:59:59.000Z'), "label": "Last 7 days" },
  { "start": moment().subtract(30, 'days').toISOString().replace(/T.*/gi, 'T00:00:00.000Z'), "end": moment().toISOString().replace(/T.*/gi, 'T23:59:59.000Z'), "label": "Last 30 days" }
]

  // console.log(moment().subtract(1, 'month').endOf('month').toISOString().replace(/T.*/gi, 'T00:00:00.000Z'), moment().format("YYYY-MM-DDTHH:mm:ss:ms"))
  const onRefresh = (start, end, refreshInterval) => {
    setRefresh(prev=>!prev)
    // Dispatch({ type: 'UPDATE_INPUT', data: { ...Context, DateFilter: { start, end } } })
    // changeInputValue(start,end)
    // return new Promise((resolve) => {
    //   setTimeout(resolve, 100);
    // }).then(() => {
    //   //changeInput to get absolute date values on referesh 

    // });
  };

  return (
    <EuiFlexItem  grow={false} style={{maxWidth:510}}>
      <EuiSuperDatePicker
        dateFormat={"MMM D, YYYY @ HH:mm"}
        ref={Reference}
        start={start}
        end={end}
        isLoading={isLoading}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
        isPaused={isPaused}
        isDisabled={isRefreshdisable}
        refreshInterval={refreshInterval}
        recentlyUsedRanges={recentlyUsedRanges}
        commonlyUsedRanges={DateRange}
        onStartInputChange={onStartInputChange}
        onEndInputChange={onEndInputChange}
      />
    </EuiFlexItem>
  )

}

export default DatePicker;
