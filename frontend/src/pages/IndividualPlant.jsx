import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const IndividualPlant = () => {
    const params = useParams()

    console.log(params)

    return (
        <div>
            <h1>Individual Plant page</h1>
            <h1>Plant id (from URL) is: {params.plantID}</h1>
            <p>3 options:</p>
            <ol>
                <li>make another get request based on plantID to get data from store all over again (bad idea)</li>
                <li>send data from all plants page through props to this component (medium idea and EASY, IMO) BUT TRADEOFF is that if user refreshes page, i dont think it'll work anymore (not entirely sure) </li>
                <li>all plant data should ideally be stored in a zustand store after it is fetched. might make sense to filter through that and find what we need rather than send through props (not bad MAYBE good(?), IMO)</li>
            </ol>
        </div>
    )
}

export default IndividualPlant