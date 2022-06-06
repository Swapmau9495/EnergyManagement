import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

// import chrome from "ui/chrome"; //importing reqired chrome
// var theme = chrome.getUiSettingsClient();
// var darkTheme = theme.cache["theme:darkMode"].userValue
// // Use themes
am4core.useTheme(am4themes_animated);
function Chart({ data, FunctionName }) {
	
	// if(darkTheme){
	//   am4core.useTheme(am4themes_dark);
	// }
	// Create chart instance
	useLayoutEffect(() => {

		let chart = am4core.create("idle_energy_by_shop", am4charts.XYChart);
		chart.colors.step = 9;
		chart.data = data

		let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		dateAxis.renderer.minGridDistance = 40;
		dateAxis.renderer.labels.template.fontSize = 10;
		dateAxis.renderer.grid.template.disabled = true;
		// dateAxis.renderer.line.strokeOpacity = 1;
		// dateAxis.renderer.line.strokeWidth = 2;
		dateAxis.tooltip.disabled = true;

		
		dateAxis.dateFormats.setKey("day", " dd ");
		dateAxis.periodChangeDateFormats.setKey("day", "MMMM");
		dateAxis.dateFormats.setKey("week", " dd ");
		dateAxis.periodChangeDateFormats.setKey("week", "MMMM");
		dateAxis.dateFormats.setKey("month", " MMM ");
		dateAxis.periodChangeDateFormats.setKey("month", "YYYY");
		
		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.title.text = "kWh";
		valueAxis.title.fontSize = "12";
		valueAxis.renderer.labels.template.fontSize = 10;
		valueAxis.tooltip.disabled = true;
		valueAxis.min = 0;
		valueAxis.numberFormatter.numberFormat = "#a";
		valueAxis.numberFormatter.bigNumberPrefixes = [
		  { "number": 1e+3, "suffix": "K" },
		  { "number": 1e+6, "suffix": "M" },
		  { "number": 1e+9, "suffix": "B" }
		];

		function createSeries(field, name) {
			// 	// Create series
			let series1 = chart.series.push(new am4charts.LineSeries());
			series1.name = name
			series1.dataFields.valueY = field;
			series1.dataFields.dateX = "date";
			series1.strokeWidth = 2;
			// series1.tensionX = 0.8;
			series1.tooltipText = "{dateX}\n{name}: [bold]{valueY}[/]";
			let circleBullet = series1.bullets.push(new am4charts.CircleBullet());
			circleBullet.circle.radius = 2
			// series1.connect = false;
		}
		if (FunctionName) {
			FunctionName.map((check) => {
				if (check.Function != null && data.length) {
					createSeries(check.Function, check.Function);
				}
				else {
					chart.openModal("There is no data available for selected time period ");

				}
			});
		} else if (FunctionName.length === 0) {
			chart.openModal("There is no data available for selected time period ");
		} else if(!chart.data){
			chart.openModal("There is no data available for selected time period ");

		}
		chart.legend = new am4charts.Legend();
		chart.legend.useDefaultMarker = true;
		chart.legend.labels.template.fontSize = 12;
		let markerTemplate = chart.legend.markers.template;
		markerTemplate.width = 15;
		markerTemplate.height = 15;
		chart.cursor = new am4charts.XYCursor();
		chart.cursor = new am4charts.XYCursor();

		return () => {
			chart.dispose();
		};
	}, [FunctionName, data]);

	return (
		<div id="idle_energy_by_shop" style={{ width: "100%", height: "90%" }}>

		</div>
	);

}

export default Chart;