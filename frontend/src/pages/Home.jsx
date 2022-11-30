import homeStyles from '../styles/home.module.css'

const Home = () => {
    return (
        <div className={homeStyles.container}>
            <h1>Home page</h1>
            <button className={homeStyles.btn}>poop</button>
        </div>
    )
}

export default Home