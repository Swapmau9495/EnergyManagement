import React, { useEffect, useState } from 'react'

export const useMetrics = () => {


    const [Metrics, setMetrics] = useState({
        Data: [{

            
            'Mon1':  {
                "Monitor": "O/G to Stand-4",
                "today": 110.50,
                "yesterday": 32.4,
                "currentmonth": 935.5,
                "LastMonth": 1025.4,
            },
              'Mon2':  {
                "Monitor": "Incomer FDR",
                "today": 103.4,
                "yesterday": 165.2,
                "currentmonth": 856.5,
                "LastMonth": 3576.4,
            },
            'Mon3':  {
                "Monitor": "Bus Coupler",
                "today": 103.4,
                "yesterday": 165.2,
                "currentmonth": 856.5,
                "LastMonth": 3576.4,
            },
         
        }

        ],

        isloading: false,
        error: false,

    })
  

    return [Metrics, setMetrics]
}
