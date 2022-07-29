import React, { useState } from 'react'
import AllCities from './AllCities'
import CityStats from './CityStats'

export default function Admin() {
    const [createdCity, setCreatedCity] = useState()
    const [addCity, setAddCity] = useState(false)
    const [updatedCity, setUpdatedCity] = useState([false, null])

    const [userInput, setUserInput] = useState({
        city: "",
        county: "",
        state: "",
        rating: "",
        dateEst: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        createNewCity(userInput)
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setUserInput({
            ...userInput,
            [e.target.name]: value,
        });
    }

    const createNewCity = (newCity) => {
        fetch("http://localhost:4000/createCity", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...newCity })
        })
            .then(res => res.json())
            .then(res => {
                setCreatedCity(res[0])
            })
            .catch(err => console.log(err))
    }

    const handleUpdateCity = (e) => {
        e.preventDefault()

        let id = updatedCity[1].id

        let updateCity = {
            tourist_rating: e.target[0].value,
            dateEst: e.target[1].value,
            estPop: e.target[2].value,
            id: updatedCity[1].id
        }

        fetch(`http://localhost:4000/city/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...updateCity })
        })
            .then(res => console.log(res))
    }


    return (
        <>
            <div>Administration</div>

            <button onClick={() => { addCity ? setAddCity(false) : setAddCity(true) }}>Add City</button>

            {addCity && <form onSubmit={handleSubmit}>
                <label>
                    City Name:
                    <input type="text" onChange={handleChange} name="city" />
                </label>
                <label>
                    County:
                    <input type="text" onChange={handleChange} name="county" />
                </label><label>
                    State:
                    <input type="text" onChange={handleChange} name="state" />
                </label><label>
                    Tourist Rating:
                    <input type="text" onChange={handleChange} name="rating" />
                </label><label>
                    Date Established:
                    <input type="text" onChange={handleChange} name="dateEst" />
                </label>
                <input type="submit" value="Submit" />
            </form>}

            {updatedCity[0] && <form onSubmit={handleUpdateCity}>
                <label>
                    Tourist Rating:
                    <input type="text" defaultValue={updatedCity[1].tourist_rating} onChange={handleChange} name="rating" />
                </label>
                <label>
                    Date Established:
                    <input type="text" defaultValue={updatedCity[1].date_established} onChange={handleChange} name="dateEst" />
                </label>
                <label>
                    Estimated Population:
                    <input type="text" defaultValue={updatedCity[1].estimated_population} onChange={handleChange} name="dateEst" />
                </label>
                <input type="submit" value="Submit" />
            </form>}
            <AllCities setUpdatedCity={setUpdatedCity} updatedCity={updatedCity} />

        </>
    )
}
