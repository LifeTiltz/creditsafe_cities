import React, { useState } from "react"
import { useAuth } from "./AuthContext"
import { useHistory } from "react-router-dom"

export default function Header() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/")
        } catch {
            setError("Failed to log out")
        }
    }

    function travelHome() {
        history.push("/")
    }

    function handleLogin() {
        history.push("/login")
    }

    if (currentUser) {
        console.log("loggedIn maybe");
    }

    return (
        <>
            <button className="home-button" onClick={travelHome}>Home</button>
            {!currentUser && <button className="login-button" onClick={handleLogin}>Login</button>}
            {currentUser && <button className="logout-button" onClick={handleLogout}>Logout</button>}
        </>
    )
}
