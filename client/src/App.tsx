import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Profie from "./components/Profie"

function App() {

  return (
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path='/profile' element={<Profie/>}/>
    </Routes>
  )
}

export default App
