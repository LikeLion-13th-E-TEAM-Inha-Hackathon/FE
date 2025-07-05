import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from './pages/Intro'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Question from './pages/Question'
import Select from './pages/Select'
import Family_Create from './pages/Family_Create'
import Family_Join from './pages/Family_Join'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/question" element={<Question />} />
        <Route path="/select" element={<Select />} />
        <Route path="/family_create" element={<Family_Create />} />
        <Route path="/family_join" element={<Family_Join />} />
      </Routes>
    </BrowserRouter>
  )
}
