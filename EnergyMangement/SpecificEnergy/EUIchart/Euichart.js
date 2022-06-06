// import React, { useState, Fragment, useContext } from 'react';
// import {
//   EuiSpacer,
//   EuiFlexGroup,
//   EuiFlexItem,
//   EuiColorPalettePicker,
// //   EUI_CHARTS_THEME_DARK,
// //   EUI_CHARTS_THEME_LIGHT,
//   euiPaletteColorBlind,
//   euiPaletteComplimentary,
//   euiPaletteForStatus,
//   euiPaletteForTemperature,
//   euiPaletteCool,
//   euiPaletteWarm,
//   euiPaletteNegative,
//   euiPalettePositive,
//   euiPaletteGray,
// } from '@elastic/eui';
// // import { ThemeContext } from '../../components';
// import '@elastic/charts/dist/theme_only_light.css';
// import {
//   Chart,
//   Settings,
//   Axis,
//   LineSeries,
//   BarSeries,
//   DataGenerator,
// } from '@elastic/charts';
// // const euiTheme =  EUI_CHARTS_THEME_LIGHT;

// const paletteData = {
//   euiPaletteColorBlind,
//   euiPaletteForStatus,
//   euiPaletteForTemperature,
//   euiPaletteComplimentary,
//   euiPaletteNegative,
//   euiPalettePositive,
//   euiPaletteCool,
//   euiPaletteWarm,
//   euiPaletteGray,
// };

// const paletteNames = Object.keys(paletteData);

// export const Theming = () => {
// //   const themeContext = useContext(ThemeContext);

//   const palettes = paletteNames.map((paletteName, index) => {
//     const options =
//       index > 0
//         ? 10
//         : {
//             sortBy: 'natural',
//           };

//     return {
//       value: paletteName,
//       title: paletteName,
//       palette: paletteData[paletteNames[index]](options),
//       type: 'fixed',
//     };
//   });

//   const [barPalette, setBarPalette] = useState('euiPaletteColorBlind');

//   /**
//    * Create data
//    */
//   const dg = new DataGenerator();
//   const data1 = dg.generateGroupedSeries(20, 1);
//   const data2 = dg.generateGroupedSeries(20, 5);
//   console.log(data2)

//   /**
//    * Setup theme based on current light/dark theme
//    */
// //   const isDarkTheme = themeContext.theme.includes('dark');
// //   const theme = isDarkTheme
// //     ? EUI_CHARTS_THEME_DARK.theme
// //     : EUI_CHARTS_THEME_LIGHT.theme;

//   const barPaletteIndex = paletteNames.findIndex((item) => item === barPalette);

//   const customTheme =
//       [
//           {
//             colors: {
//               vizColors: paletteData[paletteNames[barPaletteIndex]](5),
//             },
//           },
//         ]
    

//   return (
//     <Fragment>
//      <Chart size={{height: 200}}>
//   <Settings
//     // theme={isDarkTheme ? EUI_CHARTS_THEME_DARK.theme : EUI_CHARTS_THEME_LIGHT.theme}
//     showLegend={false}
    
//   />
//   <BarSeries
//     id="financial"
//     name="Financial"
//     data={[[0,1],[1,2]]}
//     xScaleType="time"
//     xAccessor={0}
//     yAccessors={[1]}
    
//   />
  
//   <Axis
//     title={formatDate(Date.now(), dateFormatAliases.date)}
//     id="bottom-axis"
//     position="bottom"
//     tickFormat={timeFormatter(niceTimeFormatByDay(1))}
    
//   />
//   <Axis
//     id="left-axis"
//     position="left"
//     showGridLines
//     tickFormat={(d) => Number(d).toFixed(2)}
//   />
// </Chart>
//       <EuiSpacer size="xxl" />
   
//     </Fragment>
//   );
// };

// export default Theming