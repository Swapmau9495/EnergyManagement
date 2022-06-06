import React, { useState, useRef, useContext,useEffect } from "react";
import {
  EuiSuperDatePicker,
  EuiFlexItem,
} from "@elastic/eui";
import { ValuesContext } from "../../EnergyMain"
import moment from 'moment';

const DatePicker = ({setRefresh,updateMetrics,updatetrendChart,updatefunctiontable,updatefunctionchart,updateassettable,updateassetchart}) => {
  const { state, dispatch } = useContext(ValuesContext);
  //function to change value in usereducer state
  const changeInputValue = (newValue) => {
    dispatch({ type: 'SELECTED_VALUE', data: newValue, });
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
  localStorage.setItem('startDate',start)
  localStorage.setItem('endDate',end)
  useEffect(()=>{
    changeInputValue({ ...state, start:start, end:end})
  },[start,end])
  // function ontimechange use to store/set values and will be called when superdatepicker chanege time
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
    changeInputValue({ ...state, start:start, end:end})
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
  var DateRange = [{ "start": "now-30d", "end": "now", "label": "Last 30 days" },
  { "start": "now-1y", "end": "now", "label": " Last 1 year" },
  { "start": "now-30m", "end": "now", "label": " Last 30 minutes" },
  { "start": "now-1w", "end": "now", "label": " Last 1 week" }
  ]

  const onRefresh = async (start, end, refreshInterval) => {
    setRefresh(prev=>!prev)
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    }).then(() => {
      //changeInput to get absolute date values on referesh 

    });;
  };
  return (
    <EuiFlexItem  grow={false} style={{maxWidth:410}}>
      <EuiSuperDatePicker
        ref={Reference}
        start={start}
        end={end}
        isLoading={isLoading}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
        isPaused={isPaused}
        isDisabled={updateMetrics||updatetrendChart||updatefunctiontable||updatefunctionchart||updateassettable||updateassetchart?true:false}
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