import { useState } from 'react'
import axios from 'axios'
import { get, getDatabase, ref } from 'firebase/database'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import usePlantStore from '../store/plants'
import PlantCard from './PlantCard'


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
    const [loading, setLoading] = useState(true)
    const plants = usePlantStore(state => state.plants)
    const setPlants = usePlantStore(state => state.setPlants)

    useEffect(() => {
        async function getAndSetPlants() {
            const plantsFromDb = await getPlants(db)
            setPlants(plantsFromDb)
            setLoading(false)
        }
        getAndSetPlants()
    }, [])


    
    return (
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "25px", justifyContent: "center"}}>
            {loading 
                ? <h3>Loading...</h3>
                : plants.map(plant => (
                    <PlantCard plant={plant} key={plant.id}/>
                ))
            }
        </div>
    )
}

export default PlantsGrid