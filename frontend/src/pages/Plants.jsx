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
        <div>
            <PlantsGrid />
            {/* <ul>
                {fakeDataArray.map((post) => (
                    <Link to={`/plants/${post.id}`} key={post.id}>
                        <li>{post.title}</li>
                    </Link>
                ))}
            </ul> */}
        </div>
    )
}

export default Plants