import React, { useEffect, useState } from 'react'

export default function GetCityOtherStats({ searchedCity, setCurrencyTemperature }) {
    let currency

    useEffect(() => {
        if (searchedCity !== undefined) {
            fetch(`https://restcountries.com/v3.1/capital/${searchedCity}`)
                .then(res => res.json())
                .then(res => {

                    currency = Object.entries(res[0].currencies)[0][1].name

                    let lat = res[0].capitalInfo.latlng[0]
                    let lon = res[0].capitalInfo.latlng[1]
                    let key = '1e5ff08ca55853bc5f538989f12bf943';
                    let units = 'metric';

                    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&exclude=hourly,daily,minutely,alerts`)
                        .then(res => res.json())
                        .then(res => {
                            setCurrencyTemperature({
                                currency: currency,
                                temperature: res.current.temp
                            })
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [searchedCity])

    return (
        <></>
    )
}
