
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './App.css'
import Examples from './pages/Examples'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Plants from './pages/Plants'
import IndividualPlant from './pages/IndividualPlant'
import NotFound from './pages/NotFound'
import Nav from './components/Nav'



function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/plants" element={<Plants/>}/>
          <Route path="/plants/:plantID" element={<IndividualPlant />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/examples" element={<Examples />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
