import { set } from "firebase/database"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PlantCard from "../components/PlantCard"
import { getAllTimeRevenue, getUserCount, getAllPlantsSold, getMonthRevenue } from "../utils/helpers"

const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]

const AdminDash = () => {
    const [loading, setLoading] = useState(true)
    const [selectedMonth, setSelectedMonth] = useState(months.indexOf("December"))
    const [selectedYear, setSelectedYear] = useState(2022)
    const [productsSold, setProductsSold] = useState([])
    const [userCount, setUserCount] = useState(0)
    const [totalProductsSoldCount, setTotalProductsSoldCount] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [monthRevenue, setMonthRevenue] = useState(0)
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
        async function getAdminData() {
            const users = await getUserCount()
            const data = await getAllTimeRevenue()
            setUserCount(users)
            setTotalRevenue(data.revenue)
            setTotalProductsSoldCount(data.productsSold)
        }
        getAdminData()
    }, [])

    useEffect(() => {
        console.log("testing", selectedMonth, selectedYear)
        setLoading(true)
        const test = async () => {
            let res = await getAllPlantsSold(selectedMonth, selectedYear)
            let monthRev = await getMonthRevenue(selectedMonth, selectedYear)
            setMonthRevenue(monthRev)
            setProductsSold(res)
            setLoading(false)
        }
        test()
    }, [selectedMonth, selectedYear])

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}}>Admin Dashboard</h1>
            <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{flex: 0.2, textAlign: "center"}}>
                    <h3>Items sold in</h3>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <label for="month">Month:</label>
                        <select value={months[selectedMonth]} onChange={(e) => setSelectedMonth(months.indexOf(e.target.value))} style={{width: "50%", alignSelf: "center"}}>
                            {months.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <label for="year">Year:</label>
                        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} style={{width: "50%", alignSelf: "center"}}>
                            {years.map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h3>Total Revenue in {months[selectedMonth]}:</h3>
                        <h3>$ {monthRevenue}</h3>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "row", flex: 0.8, gap: "25px"}}>
                    {productsSold.length === 0 
                        ?  <h3 style={{alignSelf: "center", flex: 1, textAlign: "center"}}>No products sold in {months[selectedMonth]}, {selectedYear}</h3>
                        : productsSold.map(plant => (
                            <PlantCard key={plant.id} plant={plant} addToCartVisible={false} addToWishlistVisible={false} />
                    ))}
                </div>
            </div>
            <div style={{textAlign: "center"}}>
                <h1>Website Usage Stats</h1>
                <p>Total Number of Users: {userCount}</p>
                <p>Total Number of Products Sold (All Time): {totalProductsSoldCount}</p>
                <p>Total Revenue (All Time): {totalRevenue}</p>
                <p>
                    For more stats, click {" "}
                    <a href="https://console.firebase.google.com/u/0/project/tinyseeds-2bf49/analytics/app/web:NWQ1YmMwOTAtMmRiMi00ZGRiLTlhYTQtYWQ0N2ZhYzRlODVm/overview/~2F%3Ft%3D1671092988339&fpn%3D255105946857&swu%3D1&sgu%3D1&sus%3Dupgraded&cs%3Dapp.m.dashboard.overview&g%3D1" target="_blank">
                        here
                    </a> 
                    {" "}
                    to look at firebase analytics.
                </p>
            </div>
        </div>
    )
}

export default AdminDash