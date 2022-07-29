import React, { useState, useEffect } from 'react'
import GetCityOtherStats from './GetCityOtherStats'

export default function CityStats({ searchedCity }) {
    const [currencyTemperature, setCurrencyTemperature] = useState(undefined)
    const [entireCityInfo, setEntireCityInfo] = useState(undefined)

    useEffect(() => {
        fetch(`http://localhost:4000/city/${searchedCity}`)
            .then(res => res.json())
            .then(res => {
                setEntireCityInfo([{ ...res[0], ...currencyTemperature }])
            })
            .catch(err => console.log(err))
    }, [currencyTemperature])

    return (
        <div className='cityStats'>
            <GetCityOtherStats setCurrencyTemperature={setCurrencyTemperature} searchedCity={searchedCity} />
            {searchedCity && entireCityInfo &&
                <div>
                    <tr>
                        <th>Name</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Rating</th>
                        <th>Date Established</th>
                        <th>Population</th>
                        <th>Currency</th>
                        <th>Weather</th>
                    </tr>
                    {entireCityInfo.map((item, i) => (
                        <tr key={i}>
                            <td>{item.city_name}</td>
                            <td>{item.state}</td>
                            <td>{item.country}</td>
                            <td>{item.tourist_rating}</td>
                            <td>{item.date_established}</td>
                            <td>{item.estimated_population}</td>
                            <td>{item.currency_code}</td>
                            <td>{item.temperature}</td>
                        </tr>
                    ))}
                </div>}
        </div>
    )
}
