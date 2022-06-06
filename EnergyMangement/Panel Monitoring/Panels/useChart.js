import React, { useEffect, useState } from 'react'

export const useChartData = () => {


    const [Chart, setChart] = useState({
        Data: [{
            'Mon1': [{
                "Date": new Date(2022, 3, 20, 10, 1),
                "Energy": 5
            },
            {
                "Date": new Date(2022, 3, 20, 10, 2),
                "Energy": 10
            },
            {
                "Date": new Date(2022, 3, 20, 10, 3),
                "Energy": 20
            },
            {
                "Date": new Date(2022, 3, 20, 10, 4),
                "Energy": 40
            },
            {
                "Date": new Date(2022, 3, 20, 10, 5),
                "Energy": 20
            },
            {
                "Date": new Date(2022, 3, 20, 10, 6),
                "Energy": 10
            },
            {
                "Date": new Date(2022, 3, 20, 10, 7),
                "Energy": 15
            },
            ],
            'Mon2': [{
                "Date": new Date(2022, 3, 20, 11, 1),
                "Energy": 90
            },
            {
                "Date": new Date(2022, 3, 20, 11, 2),
                "Energy": 70
            },
            {
                "Date": new Date(2022, 3, 20, 11, 3),
                "Energy": 60
            },
            {
                "Date": new Date(2022, 3, 20, 11, 4),
                "Energy": 50
            },
            {
                "Date": new Date(2022, 3, 20, 11, 5),
                "Energy": 30
            },
            {
                "Date": new Date(2022, 3, 20, 11, 6),
                "Energy": 20
            },
            {
                "Date": new Date(2022, 3, 20, 11, 7),
                "Energy": 25
            },
            ],
            'Mon3': [{
                "Date": new Date(2022, 3, 20, 12, 1),
                "Energy": 10
            },
            {
                "Date": new Date(2022, 3, 20, 12, 2),
                "Energy": 15
            },
            {
                "Date": new Date(2022, 3, 20, 12, 3),
                "Energy": 60
            },
            {
                "Date": new Date(2022, 3, 20, 12, 4),
                "Energy": 50
            },
            {
                "Date": new Date(2022, 3, 20, 12, 5),
                "Energy": 30
            },
            {
                "Date": new Date(2022, 3, 20, 12, 6),
                "Energy": 20
            },
            {
                "Date": new Date(2022, 3, 20, 12, 7),
                "Energy": 25
            },
            ],
            'Mon4': [{
                "Date": new Date(2022, 3, 20, 12, 1),
                "Energy": 10
            },
            {
                "Date": new Date(2022, 3, 20, 12, 2),
                "Energy": 15
            },
            {
                "Date": new Date(2022, 3, 20, 12, 3),
                "Energy": 60
            },
            {
                "Date": new Date(2022, 3, 20, 12, 4),
                "Energy": 50
            },
            {
                "Date": new Date(2022, 3, 20, 12, 5),
                "Energy": 30
            },
            {
                "Date": new Date(2022, 3, 20, 12, 6),
                "Energy": 20
            },
            {
                "Date": new Date(2022, 3, 20, 12, 7),
                "Energy": 25
            },
            ]

        }],
        isChartLoading: false,
        error: false,
        isDataEmpty: true
    })
   

    return [Chart, setChart]
}
