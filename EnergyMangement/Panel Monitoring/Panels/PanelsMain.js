import React,{useState} from 'react';
import { EuiStat, EuiFlexItem, EuiFlexGroup, EuiPanel, EuiSpacer, EuiTitle, EuiText,EuiButtonGroup } from '@elastic/eui';
import { useMetrics } from './useMetrics';
import { useChartData } from './useChart';
import ConsumptionTrend from './ConsumptionTrend'
import Buttongroup from './Buttongroup';
const PanelsMain = () => {

    const [Metrics, setMetrics] = useMetrics()
    const [Charts, setCharts] = useChartData()
   
    const createPanels = () => {
        let PanelsList = []
        for (let val in Metrics.Data[0]) {
            console.log(Object.keys(Charts.Data[0]), val)



            const temp = <EuiFlexItem key={val + 'metrics'}>
                <EuiFlexItem style={{ padding: "1.2em", paddingLeft: "2.5rem", paddingRight: "2.1rem", paddingBottom: '0.5rem', fontWeight: 'bold', fontSize: 20 }}>
                    {Metrics.Data[0][val]['Monitor']}

                </EuiFlexItem>
                <EuiFlexGroup style={{ padding: "1.5em", paddingLeft: "2.5rem", paddingRight: '2.1rem' }}>

                    <EuiPanel style={{ maxWidth: '200px' , boxShadow: '3px 3px 0px 0px rgb(195 195 195)' , borderTopStyle: 'hidden' }}>
                        <EuiFlexItem grow={false}>
                            <EuiStat title={<b>{Metrics.Data[0][val]['today']}</b>} description="Today" titleSize="l" />
                            <EuiSpacer />
                            <EuiStat
                                title={<b>{Metrics.Data[0][val]['yesterday']}</b>}
                                description="Yesterday"
                                titleSize="xs"
                            />
                        </EuiFlexItem>
                    </EuiPanel>
                    <EuiFlexItem grow={false} />
                    <EuiPanel style={{ height: 200, boxShadow: '3px 3px 0px 0px rgb(195 195 195)' , borderTopStyle: 'hidden'  }}>
                        <EuiFlexGroup>
              

                        <Buttongroup />

                        </EuiFlexGroup>
                        <EuiSpacer />
                        <EuiSpacer />
                    
                        <ConsumptionTrend props={Charts.Data[0][val]} id={val} />
                    </EuiPanel>
                    <EuiFlexItem grow={false} />

                    <EuiPanel style={{ maxWidth: '200px' , boxShadow: '3px 3px 0px 0px rgb(195 195 195)' , borderTopStyle: 'hidden' }}>
                        <EuiFlexItem>
                            <EuiStat title={<b>{Metrics.Data[0][val]['currentmonth']}</b>} description="Current Month" titleSize="l" />
                            <EuiSpacer />
                            <EuiStat
                                title={<b>{Metrics.Data[0][val]['LastMonth']}</b>}
                                description="Last Month"
                                titleSize="xs"
                            />
                        </EuiFlexItem>
                    </EuiPanel>
                </EuiFlexGroup>
            </EuiFlexItem>
            PanelsList.push(temp)
            // }
        }
        return PanelsList
        // } 
    }
    let panelsvalues = createPanels();




    return (
        <>
            <EuiFlexItem >

                {panelsvalues}
            </EuiFlexItem>
            {/* <EuiFlexItem style={{ padding: "1.2em",paddingLeft:"2.5rem", paddingRight:"2.1rem",paddingBottom:'0.5rem',fontWeight:'bold', fontSize:20 }}>
     {Metrics.Data.Monitor}

     </EuiFlexItem>

 <EuiFlexGroup style={{ padding: "1.5em",paddingLeft:"2.5rem", paddingRight:"2.1rem" }}>
        <EuiPanel >
        <EuiFlexItem>
        <EuiStat title={<b>{Metrics.Data.today}</b>} description="Today" titleSize="l" />
        </EuiFlexItem>
        <EuiSpacer/>
        <EuiFlexItem>
        <EuiStat
          title={<b>{Metrics.Data.yesterday}</b>}
          description="Yesterday"
          titleSize="xs"
        />
      </EuiFlexItem>
        </EuiPanel>
    
    </EuiFlexGroup> */}
        </>
    )

}
//   </div>
export default PanelsMain