import React, { useState, useEffect } from 'react'

export default function AllCities({ setUpdatedCity }) {
    const [entireCityInfo, setEntireCityInfo] = useState(undefined)
    const [deletedIds, setDeletedIds] = useState()
    useEffect(() => {
        fetch(`http://localhost:4000/allcities`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setEntireCityInfo(res)
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (e, id) => {
        e.preventDefault()

        fetch(`http://localhost:4000/delete/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
        })
            .then(res => console.log(res))
            .then(res => {
                setDeletedIds(...deletedIds, res)
            })
            .catch(err => console.log(err))

    }

    const handleEdit = (e, cityInfo) => {
        e.preventDefault()
        setUpdatedCity([true, cityInfo])
    }

    return (
        <div className='cityStats'>
            {entireCityInfo &&
                <div>
                    <tr>
                        <th>Name</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Rating</th>
                        <th>Date Established</th>
                        <th>Population</th>
                        <th>Modify</th>
                    </tr>
                    <>
                        {Object.keys(entireCityInfo).map((key, i) => (

                            <tr key={i}>
                                <td>{entireCityInfo[key].city_name}</td>
                                <td>{entireCityInfo[key].state}</td>
                                <td>{entireCityInfo[key].country}</td>
                                <td>{entireCityInfo[key].tourist_rating}</td>
                                <td>{entireCityInfo[key].date_established}</td>
                                <td>{entireCityInfo[key].estimated_population}</td>
                                <td> <button onClick={(e) => handleDelete(e, entireCityInfo[key].id)}>Delete</button> <button onClick={e => handleEdit(e, entireCityInfo[key])}>Edit</button> </td>
                            </tr>
                        ))}
                    </>
                </div>}
        </div>
    )
}
