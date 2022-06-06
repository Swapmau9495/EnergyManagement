import React, { Fragment, useEffect} from 'react';
import {
  EuiStat,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
} from '@elastic/eui';
import { useActiveFilter } from '../../../store/Providers';


const Metrics = ({Refresh,sameplant,setRefreshdisable,idlemetricsFetchHelper}) => {

  const [activeFilter] = useActiveFilter();
    const {  plant,start_date,end_date } = activeFilter;
    const {response, isloading,  execute} = idlemetricsFetchHelper;
    useEffect(()=>{
      if(isloading){
          setRefreshdisable(true)
      }else{
          setRefreshdisable(false)
      }
  },[isloading])
    useEffect(() => {
        console.log(activeFilter)
      if (plant.value )
          execute({ url: `_ems/plant/${plant.value}`,  data: {
                       from:start_date,
                       to:end_date
                    }});
    }, [plant.value,start_date,end_date,Refresh]);



  // const { state, dispatch } = useContext(ValuesContext);
  // const [metrics, setMetrics] = useState({
  //   data: [{'idle_energy':'', 'total_energy':'', 'idle_energy_percent':''}],
  //   isLoading: false,
  //   error: false
  // })
  // function getMetrics() {
  //   setMetrics({ ...metrics , isLoading: true })
  //   setUpdatemetrics(true)
  //   $.ajax({
  //     url: `${host_name}:${port_number}/_ems/plant/${state.plantid}`,
  //     data: {
  //       from:state.start,
  //       to:state.end,
   
  //     },  
  //       success: function (data) {
  //       setMetrics({ data: data, isLoading: false, error: false })
  //       setUpdatemetrics(false)

  //     },
  //     error: function () {
  //       setMetrics({data:{idle_energy:'', total_energy:'', idle_energy_percent:''}, isLoading: false, error: true })
  //       setUpdatemetrics(false)

  //     }
  //   })
  // }

  // useEffect(() => {
  //   setMetrics({ data:[{'idle_energy':'', 'total_energy':'', 'idle_energy_percent':''}], isLoading: false, error: false })
  //   state.plantid && getMetrics()
  // }, [state.plantid,state.start,state.end,Refresh,sameplant]);

 
  return (
    <Fragment>
      {/* <div style={{ marginTop: '15px', marginLeft:'5px', marginRight:'5px'}}>
      <EuiFlexGroup  > */}
      <EuiFlexItem  >
        <EuiPanel   >
          <EuiFlexGroup style={{paddingTop:65}} gutterSize='s' >
            <EuiFlexItem >
            <EuiStat
                title={response?.idle_energy? <b>{Number(parseFloat(response?.idle_energy/1000 ).toFixed(1)).toLocaleString('en', {
                  minimumFractionDigits: 1
              })}</b>:'-'}
                description="Idle Energy (MWh)"
                titleSize='l'
                descriptionElement="h4"
                textAlign='center'
                isLoading={isloading}
              />
            </EuiFlexItem>
            <EuiFlexItem>
            <EuiStat
                title={response?.total_energy?<b>{Number(parseFloat(response?.total_energy/1000 ).toFixed(1)).toLocaleString('en', {
                  minimumFractionDigits: 1
              })}</b> :'-'}
                titleSize='l'
                description="Total Energy (MWh)"
                descriptionElement="h4"
                textAlign='center'
                isLoading={isloading}
              />
            </EuiFlexItem>
            <EuiFlexItem>
            <EuiStat
                title={response?.idle_energy_percent?<b>{Number(parseFloat(response?.idle_energy_percent ).toFixed(1)).toLocaleString('en', {
                  minimumFractionDigits: 1
              })+'%'}</b> :'-'}
                description="%"
                titleSize='l'
                descriptionElement="h4"
                textAlign='center'
                isLoading={isloading}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size='l' />
        </EuiPanel>
      </EuiFlexItem>
    
    </Fragment>
  );
}

export default Metrics;