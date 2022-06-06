import React, {useLayoutEffect,useRef } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
/* 
import chrome from "ui/chrome"; //importing reqired chrome
var theme = chrome.getUiSettingsClient();
var darkTheme = theme.cache["theme:darkMode"].userValue
 */


const  ProdkWhChart=({props})=> {
 /*  if(darkTheme){
    am4core.useTheme(am4themes_dark);
  } */
  
  const mainChart = useRef(null);
  am4core.options.commercialLicense = true;
  useLayoutEffect(() => {
    let chart = am4core.create("shopchartsdiv", am4charts.XYChart);
    chart.fontsize = 10;
    chart.colors.list = [am4core.color("#67b7dc"), am4core.color("#FBC02D")];
    // Use props to fetch chart data dynamically 
    chart.data=props
   
    if(chart.data.length === 0) {
      chart.openModal("There is no data for selected time period");
    };
    /* Create axes */
    let dateAxis_daily = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis_daily.renderer.grid.template.location = 0;
    dateAxis_daily.dateFormatter.inputDateFormat =
      "yyyy-MM-ddThh:mm:ss.sssZ";
    dateAxis_daily.tooltipTimeFormat = "HH:mm, d MMMM";
    dateAxis_daily.dateFormats.setKey("day", " dd ");
    dateAxis_daily.periodChangeDateFormats.setKey("day", "MMMM"); 
    dateAxis_daily.dateFormats.setKey("week", " dd ");
    dateAxis_daily.periodChangeDateFormats.setKey("week", "MMMM"); 
    dateAxis_daily.dateFormats.setKey("month", " MMM ");
    dateAxis_daily.periodChangeDateFormats.setKey("month", "YYYY"); 

    dateAxis_daily.renderer.minGridDistance = 40;
    // dateAxis_daily.fontsize = 8;
    dateAxis_daily.renderer.grid.template.disabled = true;
    dateAxis_daily.renderer.labels.template.fontSize = 10;
    dateAxis_daily.renderer.cellStartLocation = 0.001

    // dateAxis_daily.renderer.labels.template.rotation = -45;

    /* Create value axis */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Production (tons)";
    valueAxis.title.fontSize = "12";
    // valueAxis.fontsize = 8;
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
    valueAxis2.title.fontSize = "12";
    valueAxis2.title.text = "kWh/ton";
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.labels.template.fontSize = 10;
    valueAxis2.renderer.grid.template.disabled = true;
    valueAxis2.renderer.labels.template.fill=am4core.color("#FF8C00")
    valueAxis2.min = 0;
    valueAxis2.numberFormatter = new am4core.NumberFormatter();
    valueAxis2.numberFormatter.numberFormat = "#.##a";
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
    // columnSeries.columns.template.width = am4core.percent(50);
    columnSeries.columns.template.width =  am4core.percent(25);
    columnSeries.columns.template.tooltipText = "[ font-size: 15px]{dateX}\n[ font-size: 15px]{name}:\n[/][ font-size: 20px]{valueY}[/] ";
    columnSeries.fill=am4core.color("#00CDFE")
    columnSeries.stroke=am4core.color("#00CDFE")
    
    columnSeries.columns.template.propertyFields.fillOpacity =
      "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth =
      "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray =
      "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "kWh/ton";
    lineSeries.dataFields.valueY = "energy";
    lineSeries.dataFields.dateX = "date";
    lineSeries.strokeWidth = 2;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";
    lineSeries.stroke = am4core.color("#FF8C00");
    lineSeries.fill=am4core.color("#FF8C00");
    lineSeries.yAxis = valueAxis2;

    var bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    bullet.fill = am4core.color("#FF8C00"); // tooltips grab fill from parent by default
    bullet.tooltipText = "[ font-size: 15px]{dateX}\n[ font-size: 15px]{name}:\n[/][ font-size: 20px]{valueY}[/] ";
    bullet.strokeWidth = 1;
    bullet.circle.radius=2;
    bullet.stroke = am4core.color("#FF8C00");

    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    chart.legend.labels.template.fontSize = 12;
    let markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 15;
    markerTemplate.height = 15;
    mainChart.current = chart;
    return () => {
      chart.dispose();
    }
  },[])

  return (
    <div id = "shopchartsdiv" style = {{width: "100%", height: "275px"}}>
    </div>
  );
}



  export default ProdkWhChart;