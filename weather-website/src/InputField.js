import React, { useState } from 'react';

export default function InputField({ setSearchedCity }) {

    const [useInput, setUseInput] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchedCity(e.target[0].value)
    }


    return (
        <><form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={useInput} onChange={(e) => setUseInput(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form></>
    )
}
