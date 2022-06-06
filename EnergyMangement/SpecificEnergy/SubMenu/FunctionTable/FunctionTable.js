import React, { useState, Fragment, useEffect } from "react";
import {
  EuiBasicTable,
  EuiText,
  EuiSpacer,
  EuiPanel
} from "@elastic/eui";
import { ADD_DRILLDOWNDATA } from '../../../store/actionTypes';
import { useActiveFilter, useFilterOption } from '../../../store/Providers';

const FunctionTable = ({ Refresh, FunctiontabFetchHelper, setRefreshdisable }) => {
  const [filterOptions, fetchHelpers, dispatch] = useFilterOption();
  const [activeFilter, filterDispatcher] = useActiveFilter();
  const { plant, start_date, end_date } = activeFilter;
 console.log(plant)
  const { isloading, error, execute } = FunctiontabFetchHelper;
  useEffect(() => {
    //condition to disable/enable Datepicker
    if (isloading) {
      setRefreshdisable(true)
    } else {
      setRefreshdisable(false)
    }
  }, [isloading])
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [table, setTable] = useState({
    items: [],
  })

  const FunctionTabledata = () => {
    execute({
      url: `_ems/function/_all`, data: {
        from: start_date,
        to: end_date,
        plant_id: plant.value,
      },
      success: function (data) {
        const items = data.map((row) => {
          return {
            Function: row.function_name,
            ConsumptionMWh: row.total_consumption,
            PercentofTotal: row.percent_of_total,
            kWhton: row.kwh_per_unit,
            NoofAssets: row.no_of_assets,
            FunctionId: row.function_id
          };
        });
        setTable({ items: items })
        return items
      }
    });

  }

  useEffect(() => {
    setTable({ items: [] })
    if (plant.value) {
      FunctionTabledata();
    } else setTable({ items: [] })

  }, [plant.value, start_date, end_date, Refresh]);

  const columns = [
    {
      field: "Function",
      name: <EuiText style={{ fontWeight: 600, fontSize: 14 }}>Function</EuiText>,
    },
    {
      field: "ConsumptionMWh",
      name: <EuiText style={{ fontWeight: 600, fontSize: 14 }}>Consumption (MWh) </EuiText>,
      render: (num) => num ? Number(parseFloat(num / 1000).toFixed(1)).toLocaleString('en', {
        minimumFractionDigits: 1
      }) : '-'
    },
    {
      field: "PercentofTotal",
      name: <EuiText style={{ fontWeight: 600, fontSize: 14 }}>% of Total</EuiText>,
      render: (num) => num ? Number(parseFloat(num).toFixed(1)).toLocaleString('en', {
        minimumFractionDigits: 1
      }) + '%' : '-'
    },
    {
      field: "kWhton",
      name: <EuiText style={{ fontWeight: 600, fontSize: 14 }}>kWh/ton</EuiText>,
      render: (num) => num ? Number(parseFloat(num).toFixed(1)).toLocaleString('en', {
        minimumFractionDigits: 1
      }) : '-'

    },
    {
      field: "NoofAssets",
      name: <EuiText style={{ fontWeight: 600, fontSize: 14 }}>No. of Assets</EuiText>
    }
  ];

  const onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;
    setPageIndex(pageIndex);
    setPageSize(pageSize);
  }

  const getRowProps = (item) => {
    const { id } = item;
    return {
      "data-test-subj": `row-${id}`,
      className: "customRowClass",
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
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [3, 5, 8], //no.of.rows per page
  };

  const getCellProps = (item, column) => {
    const { id } = item;
    const { field } = column;
    return {
      className: "customCellClass",
      "data-test-subj": `cell-${id}-${field}`,
      onClick: () => {
        // URL to redirect to Function Drilldown Page
        window.location.href = `#/ShopDetails`
        // UseContext to Save And Retrive data for Drilldown Page
        dispatch({ type: ADD_DRILLDOWNDATA, payload: { Startdate: start_date, Enddate: end_date, Plantid: plant.value, _Function: item['Function'], Functionid: item['FunctionId']/* , ConsumptionkWh: item['ConsumptionkWh'], PercentofTotal: item['PercentofTotal'], kWhton: item['kWhton'], NoofAssets: item['NoofAssets']  */}, filterDispatcher });
      },
    };
  };
  let DisplayMessage = isloading ? "Table Loading..." : 'There is no data available for selected time period';
  let ErrorMessage = error ? "Something Went Wrong" : null
  return (
    <Fragment>
      <EuiPanel>
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
    </Fragment>
  );
}

export default FunctionTable;
