import React, { useState, Fragment, useEffect } from 'react';
import {
  EuiBasicTable,
  EuiTitle,
  EuiPanel,
  EuiText,
  EuiFlexGroup,
  EuiSpacer,
} from '@elastic/eui';
import { ADD_DRILLDOWNDATA } from '../../../../store/actionTypes';
import {useActiveFilter, useFilterOption } from '../../../../store/Providers';

const AllAssetsTable = ({ setRefreshdisable, Refresh,functionassettable}) => {
  const [filterOptions,fetchHelpers, dispatch] = useFilterOption();
  const [ filterDispatcher] = useActiveFilter();
  const { plant,start_date,end_date } = filterOptions;
  const { isloading,error,  execute} = functionassettable;
  console.log(plant)
  useEffect(()=>{
    //condition to disable/enable Datepicker
    if(isloading){
        setRefreshdisable(true)
    }else{
        setRefreshdisable(false)
    }
},[isloading])
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [table, setTable] = useState({
    items: [],
  })

  const AllAssetsValues = () => {
    execute({ url: `_ems/asset/_all`,  data: {
      from:start_date,
      to:end_date,
      plant_id: filterOptions.drilldowndata.Plantid,
      function_id: filterOptions.drilldowndata.Functionid,
      label:'function'
       },
    success:function (data) {
          const items = data.map((row) => {
            return {
              AssetName: row.asset_name,
              ConsumptionMWh: row.total_consumption,
              PercentofTotal: row.percent_of_total,
              IdleEnergy: row.idle_energy,
              AvgCurrent: row.avg_current,
              AvgVoltage: row.avg_voltage,
              AvgPower: row.avg_power,
              PowerFactor: row.power_factor,
              ApparentPower: row.apparent_power,
              ReactivePower: row.reactive_power,
              AssetId:row.asset_id,
              FunctionId:row.function_id,
              Function: row.function_name,
              Asset:row.asset_name
            };
          });
          setTable({ items: items })
          // setFunctiontab(false)
          return items
        }
  });
  
  }



  useEffect(() => {
    setTable({ items: [] })
    start_date && end_date && AllAssetsValues();
  }, [Refresh, start_date, end_date]);


  const onTableChange = ({ page }) => {
    const { index: pageIndex, size: pageSize } = page;
    setPageIndex(pageIndex);
    setPageSize(pageSize);

  }
  const columns = [
    {
      field: 'AssetName',
      name: <EuiText style={{ fontWeight: 600, fontSize: 14 }}>Asset Name</EuiText>,
    },
    {
      field: 'ConsumptionMWh',
      name: <EuiText style={{ fontWeight: 600, fontSize: 14 }}>Consumption (MWh)</EuiText>,
      render: (num) => num ? Number(parseFloat(num / 1000).toFixed(1)).toLocaleString('en', {
        minimumFractionDigits: 1
      }) : '-'

    },
    {
      field: 'PercentofTotal',
      name: <EuiText style={{ fontWeight: 600, fontSize: 14 }}>% of Function</EuiText>,
      render: (num) => num ? Number(parseFloat(num).toFixed(1)).toLocaleString('en', {
        minimumFractionDigits: 1
      })
        : '-'
    },
    {
      field: 'IdleEnergy',
      name: <EuiText style={{ fontWeight: 600, fontSize: 14 }}>Idle Energy (MWh)</EuiText>,
      render: (num) => num ? Number(parseFloat(num).toFixed(1)).toLocaleString('en', {
        minimumFractionDigits: 1
      }) : '-'
    },
    {
      field: 'AvgCurrent',
      name: <EuiText style={{ fontWeight: 600, fontSize: 14 }}>Avg Current</EuiText>,
      render: (num) => num ? Number(parseFloat(num).toFixed(1)).toLocaleString('en', {
        minimumFractionDigits: 1
      }) : '-'
    },
    {
      field: 'AvgVoltage',
      name: <EuiText style={{ fontWeight: 600, fontSize: 14 }}>Avg Voltage</EuiText>,
      render: (num) => num ? Number(parseFloat(num).toFixed(1)).toLocaleString('en', {
        minimumFractionDigits: 1
      }) : '-'

    },
    {
      field: 'AvgPower',
      name: <EuiText style={{ fontWeight: 600, fontSize: 14 }}>Avg Power</EuiText>,
      render: (num) => num ? Number(parseFloat(num).toFixed(1)).toLocaleString('en', {
        minimumFractionDigits: 1
      }) : '-'
    },
  ];

  const getRowProps = (item) => {
    const { id } = item;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
      onClick: () => {
      },
    };
  };

  // Pagination for the table
  const indexOfFirstpost = pageIndex * pageSize;
  const indexOfLastpost = indexOfFirstpost + 1 * pageSize;
  const pageOfItems = table.items.slice(indexOfFirstpost, indexOfLastpost);
  const totalItemCount = table.items.length;
  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [3, 5, 8], //no.of.rows per page
  };
  const getCellProps = (item, column) => {
    const { id } = item;
    const { field } = column;
    return {
      className: 'customCellClass',
      'data-test-subj': `cell-${id}-${field}`,
      onClick: () => {
         window.location.href =`#/AssetDetails` 
         dispatch({ type: ADD_DRILLDOWNDATA, payload: { Startdate: start_date, Enddate: end_date, _Function: item['Function'], Plantid: plant[0].value, Asset: item['Asset'], Assetid: item['AssetId'], Functionid: item['FunctionId']/* , ConsumptionkWh: item['ConsumptionkWh'], PercentofTotal: item['PercentofTotal'] */ }, filterDispatcher });
       },
      readOnly: true,
    };
  };
  let DisplayMessage = isloading ? 'Table Loading...' : 'There is no data for selected time period';
  let ErrorMessage = error ? 'Something Went Wrong' : null
  return (
    <Fragment>
      <EuiFlexGroup style={{
        paddingTop: '0.15em', paddingRight: '1.65em', paddingLeft: '1.65em', paddingBottom: '1em'
      }}>
        <EuiPanel >
          <EuiTitle size='s'>
            <EuiText><strong>All Assets</strong></EuiText>
          </EuiTitle>
          <EuiSpacer size='s' />
          <EuiBasicTable
            columns={columns}
            items={pageOfItems}
            rowProps={getRowProps}
            pagination={pagination}
            onChange={onTableChange}
            cellProps={getCellProps}
            loading={isloading}
            noItemsMessage={DisplayMessage}
            error={ErrorMessage}
          />
        </EuiPanel>
      </EuiFlexGroup>
      <EuiSpacer size='xs' />
    </Fragment>
  );
}

export default AllAssetsTable;
