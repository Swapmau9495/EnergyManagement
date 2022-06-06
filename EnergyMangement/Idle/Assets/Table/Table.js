import React, { Fragment, useEffect, useState } from "react";
import {
  EuiPanel,
  EuiBasicTable,
  EuiFlexItem,
  EuiTitle,
  EuiText,
  EuiSpacer
} from "@elastic/eui";
import { useActiveFilter } from '../../../store/Providers';

function Table({Refresh,setAssetNames,assettableFetchHelper,setRefreshdisable}) {
  const [activeFilter] = useActiveFilter();
  const {  plant, start_date, end_date } = activeFilter;

  const {  isloading, error, execute } = assettableFetchHelper;
  useEffect(()=>{
    //condition to disable/enable Datepicker
    if(isloading){
        setRefreshdisable(true)
    }else{
        setRefreshdisable(false)
    }
},[isloading])
  const [table, setTable] = useState({
    items: [],
  })

  const getTable = () => {
    // setFunctiontab(true)
    execute({
      url: `_ems/asset/_all`, data: {
        from: start_date,
        to: end_date,
        plant_id: plant.value,
        label:'plant'
      },
      success: function (data) {
        const items = data.map((row) => {
          return {
            Asset: row.asset_name,
            IdleEnergyMWh:row.idle_energy,
            TotalEnergy:row.total_energy,
            PercentofTotal: row.idle_energy_percent,
          };
        });
        setTable({ items: items })
        if (data) {

          const assetnames = data.map((names) => {
            return {
              Asset: names.function_name,
            }
          })
          setAssetNames(assetnames)
        }
        return items
      }
    });

  }
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;
    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };
  
  useEffect(() => {
    setAssetNames([])
    setTable({ items:[]})
    if( plant.value) {
      getTable()
    }

  }, [plant.value,start_date,end_date, Refresh])

  const columns = [
    {
      field: "Asset",
      name: <EuiText style={{fontWeight:600,fontSize:14}}>Asset</EuiText>,
    },
    {
      field: "IdleEnergyMWh",
      name: <EuiText style={{fontWeight:600,fontSize:14}}>Idle Energy (MWh)</EuiText>,
      render:(num)=> num? Number(parseFloat(num/1000).toFixed(1)).toLocaleString('en', {
        minimumFractionDigits: 1
    }):'-'
    },
    {
      field: "TotalEnergy",
      name: <EuiText style={{fontWeight:600,fontSize:14}}>Total Energy (MWh)</EuiText>,
      render:(num)=> num? Number(parseFloat(num/1000).toFixed(1)).toLocaleString('en', {
        minimumFractionDigits: 1
    }):'-'
    },
    {
      field: "PercentofTotal",
      name: <EuiText style={{fontWeight:600,fontSize:14}}>%</EuiText>,
      render:(num)=> num? Number(parseFloat(num).toFixed(1)).toLocaleString('en', {
        minimumFractionDigits: 1
    })+'%':'-'
    }
  ]

  const getRowProps = (item) => {
    const { id } = item;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
      onClick: () => { },
    };
  };
  const getCellProps = (item, column) => {
    const { id } = item;
    const { field } = column;
    return {
      className: 'customCellClass',
      'data-test-subj': `cell-${id}-${field}`,
      textOnly: true,
    };
  };

  const indexOfFirstpost = pageIndex * pageSize
  const indexOfLastpost = indexOfFirstpost + 1 * pageSize
  const pageOfItems = table.items.slice(indexOfFirstpost, indexOfLastpost)
  const totalItemCount = table.items.length
  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [3, 5],
  };
  const loadingMessage =isloading? "Table Loading . . ." : 'There is no data for selected time period'
  const errorMessage = error ? "Something went wrong" : null

  return (
    <Fragment>
      <EuiFlexItem  >
        <EuiPanel  >
          <EuiTitle size="l">
            <EuiText>
              <strong>All Assets</strong>
            </EuiText>
          </EuiTitle>
          <EuiSpacer size='m'/>
          <EuiBasicTable
            loading={isloading}
            items={pageOfItems}
            columns={columns}
            rowProps={getRowProps}
            cellProps={getCellProps}
            pagination={pagination}
            onChange={onTableChange}
            noItemsMessage={loadingMessage}
            error={errorMessage}
          />
        </EuiPanel>
      </EuiFlexItem>
    </Fragment>
  );
}

export default Table;
