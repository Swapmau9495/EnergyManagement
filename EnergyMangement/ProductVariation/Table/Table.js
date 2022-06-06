import React, { useState, Fragment, useEffect, useContext } from 'react';
import { EuiText, EuiFlexGroup, EuiInMemoryTable, EuiPanel } from '@elastic/eui';
import { useActiveFilter } from '../../store/Providers';

//This component to create table and display data in table
const Table = ({ Refresh ,setRefreshdisable,ProductionFetchHelper}) => {
    const [activeFilter] = useActiveFilter();
    const { plant,production, start_date,end_date } = activeFilter;

    const { isloading, execute} = ProductionFetchHelper;
    useEffect(()=>{
    //condition to disable/enable Datepicker
    if(isloading){
            setRefreshdisable(true)
        }else{
            setRefreshdisable(false)
        }
    },[isloading])
 
    const gettabledata = () => {
        const filteredprod=production.map((a)=>a.label)
      execute({ url: `/_ems/benchmarking/${plant.value}`,  data: {
        from:start_date,
        to:end_date,
        specs:filteredprod.join()
    },
      success:function (data) {
        setTableData(data)
          }
    });
    }

    const [TableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const column = Object.keys(TableData[0] ?? {}).map((key, index) => ({
        field: key,
        name: key,
        sortable: !index ? ({ product_type }) => +product_type : true,
        render: (value) => {
            if (!index) {
                return value;
            } else {
                if(key==='Production (tons)'){
                    return  Number(parseFloat(value).toFixed(1))+'K'
                }else  return  Number(parseFloat(value).toFixed(1))
            }
        }
        // width:'250px',
    }));

    let cell = (item) => {
        let fillColor = item[1]
        if (item[1] === "Yellow") fillColor = "#FFAE00";
        return (
            <EuiText /* color={fillColor} */ style={{/* fontWeight: "600", */color: fillColor }}>
                {item[0]}
            </EuiText>
        )
    }

    // let column
    useEffect(() => {
        setTableData([])
        plant.value && production && gettabledata();

    }, [start_date, end_date, plant.value, Refresh,production])


    return (
        <Fragment>
            <EuiFlexGroup >
                <EuiPanel style={{ margin: '25px' }} >
                    <div
                        className='eui-yScroll euiYScrollWithShadows eui-xScroll euiXScrollWithShadows'
                        style={{
                            overflowX: 'scroll', overflowY: 'scroll', whiteSpace: 'nowrap', maxHeight: '600px',
                        }}>
                        <EuiInMemoryTable
                            // style={{ width: '100px' }}
                            items={TableData}
                            columns={column}
                            // rowProps={getRowProps}
                            // cellProps={getCellProps}
                            // pagination={true}
                            // onChange={onTableChange}
                            tableLayout='fixed'
                            loading={isloading}
                            sorting={true}
                            noItemsMessage={isloading?'Table Loading':'There is no data available for selected time period'}
                        />
                    </div>
                </EuiPanel>
            </EuiFlexGroup>
        </Fragment>
    );
}


export default Table;