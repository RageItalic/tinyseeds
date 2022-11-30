import { useState, useEffect } from 'react'
import {child, get, getDatabase, ref, set} from 'firebase/database'
import axios from 'axios'

const exampleGet = async () => {
    try {
        let response = await axios.get("http://localhost:8080/")
        console.log("Result from get request: ", response.data)
    } catch (e) {
        console.error("Something went wrong with get request", error);
        console.log("Make sure the backend is runnning!")
    }
  }
  
const examplePost = async () => {
    const db = getDatabase()
    let userInfo = {
        "id": 1,
        "name": "paul",
        "age": 24,
        "poopsDaily": true,
        "favFoods": ["Pizza", "sushi"],
    }
    let userInfo2 = {
        "id": 2,
        "name": "parth",
        "age": 24,
        "poopsDaily": true,
        "favFoods": ["Pizza", "Tacos"],
    }
    let plantInfo = {
        "id": 1,
        "name": "Rose",
        "color": "red"
    }

    try {
        set(ref(db, "users/"+userInfo.id), userInfo)
        set(ref(db, "plants/"+plantInfo.id), plantInfo)

        setTimeout(async () => {
            // set(ref(db, "users/"+userInfo.id), null)
            try {
                const dbRef = ref(getDatabase())
                const snapshot = await get(child(dbRef, `plants/1`))
                if (snapshot.exists()) {
                    //access to plant is in here
                    const plantInfoFromDb = snapshot.val()
                    console.log(plantInfoFromDb)
                } else {
                    console.log("Plant not found")
                }
            } catch (e) {
                console.error("Something wrong with get: ", e)
            }


        }, 10000)

    } catch (e) {
        console.error("Setting to db failed: ", e)
    }
    // try {
    //     let response = await axios.post("http://localhost:8080/sendData", dataHolder)
    //     console.log("look here ", response.data)
    // } catch (e) {
    //     console.error("Something went wrong with post request", error);
    //     console.log("Make sure the backend is runnning!")
    // }
}

const Examples = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        // exampleGet()
        examplePost()
    }, [])

    return (
        <div>
            <h1>React Examples Page</h1>
            <p>Open up the console to see get and post examples</p>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p onClick={() => examplePost()}>
                    click here and then look at console for example post request
                </p>
            </div>
        </div>
    )
}

export default Examples