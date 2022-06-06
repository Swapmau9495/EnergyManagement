import { useState, useEffect, } from 'react'
import $ from 'jquery'
const { host_name, port_number } = require('../../CommonComponents/Config');

const useFetch = (Headers) => {
  const { url, method, data = null, headers = null, toasts = null, success = null } = Headers;
  const [error, setError] = useState(false);
  const [response, setResponse] = useState({
    response: null,
    isloading: false,
  })
  const [changeProps, setChangeProps] = useState({ url, method, data, headers, toasts, success });
  const isFunction = value => typeof value === 'function';
  const execute = (properties) => {
    setChangeProps(state => ({ ...state, ...properties }));
  }
  useEffect(() => {
    let prevCall;
    const fetchData = () => {
      return $.ajax({
        url: `../_api/${changeProps.url}`,
        // headers: { "x-access-tokens": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJ0RDZEa21BSFZtaXd0UHQyS24iLCJleHAiOjE2NDQyOTYwOTh9.8ns9a_bLzFoyP1bPji8f5YMVSQwuffhmb0GJYNgayco"  ? "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJ0RDZEa21BSFZtaXd0UHQyS24iLCJleHAiOjE2NDQyOTYwOTh9.8ns9a_bLzFoyP1bPji8f5YMVSQwuffhmb0GJYNgayco"  : '', ...JSON.parse(changeProps.headers) },
        // headers: {"Authorization":'Basic YWRtaW46N1RWdG9ZZE95VnhySXRZMVVN'},
        method: changeProps.method,
        data: changeProps.data,
        contentType: 'application/json',
        success(data) {
          let modifiedData;
          if (isFunction(changeProps.success))
            modifiedData = changeProps.success(data);
          else modifiedData = data;
          // if (changeProps.method === 'GET') setCache(this.url, changeProps.data, modifiedData)
          setResponse({ response: modifiedData, isloading: false});
          // changeProps.toasts && addToastMerging(changeProps.toasts.success, modifiedData);
        },
        error: (err) => {
          let modifiedError;
          if (isFunction(changeProps._error))
            modifiedError = changeProps._error(err);
          else modifiedError = err;
          setResponse({ response: null, isloading: false});
          setError(true);
        }
      })
    }
    if (changeProps.url) {
      setError(false);
      setResponse(res => ({ ...res, isloading: true }));
      prevCall = fetchData();
    }
    return () => {
      prevCall && prevCall.abort()
    }
  }, [method, changeProps, data, headers, url]);

  return {response:response.response, isloading:response.isloading, error, execute};
}

export default useFetch;