import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const AdminDash = () => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    function handleAdminAccess() {
        const adminPass = prompt("Enter Admin Password")

        if (adminPass === "test123") {
            setLoading(false)
        } else {
            alert("Wrong password entered, please try again.")
            navigate("/")
        }
    }

    useEffect(() => {
        handleAdminAccess()
    }, [])




    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h1>Items sold this month</h1>
            </div>
            <div>
                <h1>Website Usage Stats</h1>
            </div>
        </div>
    )
}

export default AdminDash