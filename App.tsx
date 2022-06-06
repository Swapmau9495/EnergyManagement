import { CoreStart, AppMountParameters } from '../../../../src/core/public';
import React from 'react';
import ReactDOM from 'react-dom';
import EMSTabs from './EnergyMangement/EMSTabs/EMSTabs';
import $ from 'jquery';

export const filterDetails = {};
export function renderApp(coreStart: CoreStart, params: AppMountParameters) {
  const http = coreStart.http;
  coreStart.chrome.setBreadcrumbs([{ text: 'Energy Consumption' }]);
  const isDarkMode = coreStart.uiSettings.get('theme:darkMode') || false;

  if (isDarkMode) {
    require('@elastic/charts/dist/theme_only_dark.css');
  } else {
    require('@elastic/charts/dist/theme_only_light.css');
  }

  $.ajaxSetup({
    url: "/_api/",
    beforeSend: (xhr, options) => {
      options.headers = {
        ...options.headers,
        Authorization: 'Basic YWRtaW46YWRtaW4=',
      };
    },
  });

  ReactDOM.render(<EMSTabs />, params.element);
  return () => ReactDOM.unmountComponentAtNode(params.element);
}
