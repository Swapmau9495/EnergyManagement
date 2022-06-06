import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4themes_dark from "@amcharts/amcharts4/themes/dark";

// import chrome from "ui/chrome"; //importing reqired chrome
// var theme = chrome.getUiSettingsClient();
// var darkTheme = theme.cache["theme:darkMode"].userValue
// console.log("from plugin", theme.cache["theme:darkMode"]);

am4core.useTheme(am4themes_animated);

const EPChart = ({ props }) => {
  
  // if(darkTheme){
  //   am4core.useTheme(am4themes_dark);
  // }
  const mainChart = useRef(null);
  
  
  am4core.options.commercialLicense = true;

  useLayoutEffect(() => {
    let chart = am4core.create("chartsdiv", am4charts.XYChart);
    chart.fontsize = 10;
    // Use props to fetch chart data dynamically 
    chart.data = props
    if (chart.data.length === 0) {
      chart.openModal("There is no data for selected time period");
    };
    /* Create axes */
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.dataFields.category = "date";
    // dateAxis.renderer.grid.template.location = 0;
    // dateAxis.tooltipTimeFormat = "HH:mm, d MMMM";
    // dateAxis.renderer.minGridDistance = 40;
    // dateAxis.fontsize = 4;
    dateAxis.renderer.grid.template.disabled = true;
    // dateAxis.title.fontSize = "13";
    // dateAxis.title.text = "Date";
    dateAxis.renderer.labels.template.fontSize = 11;
    dateAxis.dateFormats.setKey("day", " dd ");
    dateAxis.periodChangeDateFormats.setKey("day", "MMMM"); 
    dateAxis.dateFormats.setKey("week", " dd ");
    dateAxis.periodChangeDateFormats.setKey("week", "MMMM"); 
    dateAxis.dateFormats.setKey("month", " MMM ");
    dateAxis.periodChangeDateFormats.setKey("month", "YYYY"); 
    // dateAxis.dateFormatter.inputDateFormat = 'i';
    // dateAxis.renderer.cellStartLocation = 0.001
    // dateAxis.renderer.cellEndLocation = 0.8
    /* Create value axis */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.fontsize = 8;
    valueAxis.title.text = "Production (tons)";
    valueAxis.title.fontSize = "13";
    valueAxis.renderer.labels.template.fontSize = 10;
    valueAxis.renderer.labels.template.fill=am4core.color("#00CDFE")
		valueAxis.min = 0;
    valueAxis.numberFormatter.numberFormat = "#a";
    valueAxis.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" }
    ];
    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.title.fontSize = "13";
    valueAxis2.title.text = "Specific Energy";
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.labels.template.fontSize = 10;
    valueAxis2.renderer.grid.template.disabled = true;
    valueAxis2.renderer.labels.template.fill=am4core.color("#FF8C00")
		valueAxis2.min = 0;
    valueAxis2.numberFormatter.numberFormat = "#a";
    valueAxis2.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" }
    ];
    /* Create series */
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Production";
    columnSeries.dataFields.valueY = "production";
    columnSeries.dataFields.dateX = "date";
    columnSeries.columns.template.width =  am4core.percent(25);
    
    columnSeries.columns.template.tooltipText = "[ font-size: 15px]{dateX}\n[ font-size: 15px]{name}:\n[/][ font-size: 20px]{valueY}[/] ";
    columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "kWh/ton";
    lineSeries.dataFields.valueY = "energy";
    lineSeries.dataFields.dateX = "date";
    lineSeries.stroke = am4core.color("#FF8C00");
    lineSeries.fill = am4core.color("#FF8C00");
    lineSeries.strokeWidth = 2;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";
    lineSeries.yAxis = valueAxis2;

    var bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    bullet.fill = am4core.color("#FF8C00"); // tooltips grab fill from parent by default
    bullet.tooltipText = "[ font-size: 15px]{dateX}\n[ font-size: 15px]{name}:\n[/][ font-size: 20px]{valueY}[/] ";
    bullet.strokeWidth = 1;
    bullet.circle.radius = 2;
    bullet.stroke = am4core.color("#FF8C00");

    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    chart.legend.labels.template.fontSize = 12;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 15;
    markerTemplate.height = 15;

    mainChart.current = chart;
    return () => {
      chart.dispose();
    }
  }, [])

  return (
    <div id="chartsdiv" style={{ width: "100%", height: "300px" }}>
    </div>
  );
}

export default EPChart;