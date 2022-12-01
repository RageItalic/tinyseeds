import axios from 'axios'
import { get, getDatabase, ref } from 'firebase/database'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import usePlantStore from '../store/plants'


const getPlants = async (db) => {
    try {
        const snapshot = await get(ref(db, `/plants`))
        if (snapshot.exists()) {
            console.log(snapshot.val())
            return snapshot.val()
        } else {
            consoe.log("no plants found")
        }
    } catch (e) {
        console.error("gettting plants failed", e)
    }
}

const PlantsGrid = () => {
    const db = getDatabase()
    const plants = usePlantStore(state => state.plants)
    const setPlants = usePlantStore(state => state.setPlants)

    useEffect(() => {
        async function getAndSetPlants() {
            const plantsFromDb = await getPlants(db)
            console.log("look here", plantsFromDb)
            setPlants(plantsFromDb)
        }
        getAndSetPlants()
    }, [])
    
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <h1>All Plants</h1>
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "25px", justifyContent: "center"}}>
                {plants.map(plant => (
                    <Link to={`/plants/${plant.id}`} key={plant.id}>
                    <div >
                        <img src={plant.imageURLS[0]} width="300px" height="auto" />
                        <p>{plant.name}</p>
                        <p>{plant.price}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PlantsGrid