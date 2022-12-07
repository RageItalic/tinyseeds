import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PlantsGrid from "../components/PlantsGrid"

const getFakeData = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
    return response.data
}

const Plants = () => {
    const [loading, setLoading] = useState(true)
    const [fakeDataArray, setFakeDataArray] = useState(null)

    useEffect(() => {

        async function fetchData() {
            const data = await getFakeData()
            setFakeDataArray(data)
            setLoading(false)
        }
        fetchData()

        console.log('hi', fakeDataArray)
    }, [])

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <h1>All Plants</h1>
            <PlantsGrid />
        </div>
    )
}

export default Plants